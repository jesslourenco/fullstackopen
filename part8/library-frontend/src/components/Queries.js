import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors{
    name
    born
    #bookCount
  }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks{
    title
    author{
      name
    }
    published
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    author{
      name
      born
      id
    }
    published
    genres
  }
}
`

export const UPDATE_BIRTHYEAR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo,
  ) {
    name
    born
    #bookCount
  }
}
`

export const CURRENT_USER = gql`
query {
  me{
    username
    id
  }
}
`
export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`