import { mongoose } from '../../db/mongoose'

const roadSchema = new mongoose.Schema({
  name : {
    required: true,
    type: String,
  },
  start : {
    required: true,
    type : Date,
    default: Date.now
  },
  end : {
    required: true,
    type : Date,
    default: Date.now
  },
  trajectory : {
    required: true,
    type: [Number],
  },
  lasers : {
    required: true,
    type: [Number],
  },
})

const Road = mongoose.model('Road', roadSchema)

export {
  Road
}
