import mongoose from 'mongoose'
import { config } from './../config/environment'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoDBURI)

export { mongoose }
