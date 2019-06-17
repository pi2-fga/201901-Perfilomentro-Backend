import mongoose from 'mongoose'
import color from 'colors/safe'
import { config } from '../config/environment'

mongoose.Promise = global.Promise

mongoose.connect(config.mongoDBURI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected with mongoose.')
    })
    .catch((error) => {
        if (config.isProduction) {
            console.error(color.red('Fail to connect with mongoose. ') + error.name)
        } else {
            console.error(color.red('Fail to connect with mongoose: '))
            console.error(error)
        }
    })

export { mongoose }
