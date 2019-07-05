import { mongoose } from '../../db/mongoose'

const roadSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  locations: [{
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    },
    _id: false
  }],
  lasers : {
    required: true,
    type: [[Number]],
  },
  number: Number,
})

const Road = mongoose.model('Road', roadSchema)

export {
  Road
}
