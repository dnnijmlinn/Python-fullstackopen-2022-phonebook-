const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

function numberValidator(val) {
  return (/(0([1-9]{1,2})-([0-9]{7}))|(0([0-9]{2})-([0-9]{8}))/).test(val)
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 15,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    maxlength: 12,
    required: true,
    validate: numberValidator
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)
