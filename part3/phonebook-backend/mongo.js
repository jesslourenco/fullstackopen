const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://jess:${password}@cluster0.svr9uhn.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')

            const name = process.argv[3]
            const number = process.argv[4]

            const person = new Person({
                name: name,
                number: number
            })

            return (person.save())
        })
        .then((result) => {
            console.log(`added ${result.name} number ${result.number} to phonebook!`)
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}

if (process.argv.length === 3) {
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')

            Person
            .find({})
            .then(result => {
                console.log('phonebook:')
                result.forEach(p => {
                    console.log(p.name + ' ' + p.number)
                })
                mongoose.connection.close()
            })
        })
    }


