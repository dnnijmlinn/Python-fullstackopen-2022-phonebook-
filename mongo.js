const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const contactName = process.argv[3]
const contactNumber = process.argv[4]


const url =
  `mongodb+srv://Denis:${password}@phonebook-db.9dhs5na.mongodb.net/phonebook?retryWrites=true&w=majority`

  
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const addNewContact = (contactName, contactNumber) => {
  const contact = new Contact({
    name: contactName,
    number: contactNumber
  })

  contact.save().then(result => {
    console.log(`added ${contact.name} number ${contact.number} to phonebook`)
    mongoose.connection.close()
  })
}

const listContacts = () => {
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
}

if (contactName && contactNumber) {
  addNewContact(contactName, contactNumber)
} else {
  listContacts()
}
