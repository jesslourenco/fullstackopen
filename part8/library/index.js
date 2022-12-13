import { ApolloServer } from 'apollo-server-express';
import { GraphQLError, execute, subscribe } from 'graphql';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws';
import { gql } from 'graphql-tag'
import { useServer } from 'graphql-ws/lib/use/ws'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'
import jwt from 'jsonwebtoken';
import { startStandaloneServer } from '@apollo/server/standalone';
import { mongoose } from 'mongoose';
import { PubSub } from 'graphql-subscriptions'
import Book from './models/book.js';
import Author from './models/author.js';
import User from './models/user.js';
import 'dotenv/config';


/* let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', 
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', 
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
] */

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.set('strictQuery', false); // get rid of mongoose7 warning in console

console.log('connecting to...', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    # bookCount: Int
    id: ID!
  }
  type User {
  username: String!
  favGenre: String!
  id: ID!
  }
  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
    username: String!
    favGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    addedBook: Book!
  }
`
const pubsub = new PubSub()

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),

    bookCount: async () => Book.collection.countDocuments(),

    allBooks: async (root, args, context) => {

      if (Object.keys(args).length === 0) return Book.find({}).populate('author')

      args.author ?
        args.author = await Author.find({ name: args.author })
        : args.author

      if (Object.keys(args).length === 1) return args.author ? Book.find({ author: args.author }).populate('author')
        : Book.find({ genres: { $in: [args.genre] } }).populate('author')

      return Book.find({ author: args.author, genres: { $in: [args.genre] } }).populate('author')
    },

    allAuthors: async () => {

      return Author.find({})

      /* inactive for now
      const response =  authors.map((a) => {
        const count = books.filter((b) => b.author === a.name).length
        a.bookCount = count
        return a
      })
      return response    */
    },

    me: (root, args, context) => { return context.currentUser }
  },

  Mutation: {
    addBook: async (root, args, context) => {

      if (!context.currentUser) {
        throw new GraphQLError('not authenticated')
      }

      const getAuthorId = async () => {
        const authorQ = await Author.findOne({ name: args.author })

        if (authorQ !== null) {
          return authorQ.id
        }

        const newAuthor = await new Author({ name: args.author })
        await newAuthor.save()
          .catch(error => {
            throw new GraphQLError(error.message, {
              invalidArgs: args,
              code: BAD_USER_INPUT,
            })
          })
        return newAuthor.id
      }

      args.author = await getAuthorId()


      const book = await new Book({ ...args })
      await book.save()
        .catch(error => {
          throw new GraphQLError(error.message, {
            invalidArgs: args,
            code: BAD_USER_INPUT,
          })
        })

      pubsub.publish('ADDED_BOOK', { addedBook: book.populate('author') })
      return await book.populate('author')
    },

    editAuthor: async (root, args, context) => {
      const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated')
      }

      if (!author) return null
      return author
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favGenre: args.favGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError(error.message, {
            invalidArgs: args,
            code: BAD_USER_INPUT,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    addedBook: {
    subscribe: () => pubsub.asyncIterator('ADDED_BOOK')
    },
  },
}

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          },
        }
      },
    },
    ],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  const PORT = 4000

  await new Promise(resolve => httpServer.listen(PORT, resolve))
  console.log(`🚀 Server is running on http://localhost:${PORT}`)

}

start()


