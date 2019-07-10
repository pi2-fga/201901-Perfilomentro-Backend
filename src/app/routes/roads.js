// Modules import
import express from 'express'
import multer from 'multer'
import _ from 'lodash'
import fs from 'fs'

// Import controller
import { RoadsController } from '../controllers/roads'

const Router = express.Router()
const upload = multer({
  dest: 'uploads/'
})

Router.route('/')
.get((request, response, next) => {
  let body = response.locals.body

  RoadsController.getAll().then((roads) => {
    body.data = { roads }
    response.send(body)
  }).catch((error) => {
    console.log('error all', error)
    body.error = error
    response.status(400).send(body)
  })
})
.post((request, response, next) => {
  let body = response.locals.body

  RoadsController.createOne({ ...permittedParamsFromBody(request.body) }).then((road) => {
    body.data = { road }
    response.send(body)
  }).catch((error) => {
    console.log('error create', error)
    body.error = error
    response.status(400).send(body)
  })
})

Router.route('/:roadId')
.get((request, response, next) => {
  let roadId = request.params.roadId
  let body = response.locals.body

  RoadsController.getRoad(roadId).then((road) => {
    body.data = { road }
    response.send(body)
  }).catch((error) => {
    console.log('error get', error)
    body.error = error
    response.status(400).send(body)
  })
})

Router.route('/add')
.post(upload.fields([{ name: 'lasers' }, { name: 'locations' }]), (request, response, next) => {
  let body = response.locals.body

  console.log('files', request.files)

  const lasers = request.files['lasers']
  console.log('lasers file', lasers)
  
  const lasersData = fs.readFileSync(lasers[0].path, 'utf8')
  
  const locations = request.files['locations']
  console.log('locations file', locations)

  const locationsData = fs.readFileSync(locations[0].path, 'utf8')

  RoadsController.addRoad(getRows(lasersData), getRows(locationsData)).then((road) => {
    body.data = { road }
    response.send(body)
  }).catch((error) => {
    console.log('error add', error)
    body.error = error
    response.status(400).send(body)
  })
})

function getRows(content) {
  return content.match(/[^\r\n]+/g);
}

function permittedParamsFromBody(body) {
  return _.pick(body, [
    'lasers',
    'locations',
    'date'
  ])
}

export default Router
