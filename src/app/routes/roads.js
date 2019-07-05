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
    body.error = error
    response.status(400).send(body)
  })
})

Router.route('/add')
.post(upload.fields([{ name: 'lasers' }, { name: 'locations' }]), (request, response, next) => {
  const lasers = request.files['lasers']
  const locations = request.files['locations']

  console.log('lasers: ', lasers);
  console.log('locations: ', locations);

  const lasersData = fs.readFileSync(lasers[0].path, 'utf8')
  const locationsData = fs.readFileSync(locations[0].path, 'utf8')


  getDataForLasers(lasersData)

  // console.log('lasers: ', lasersData);
  // console.log('locations: ', locationsData);
  response.sendStatus(200);

  // let body = response.locals.body

  // RoadsController.createOne({ ...permittedParamsFromBody(request.body) }).then((road) => {
  //   body.data = { road }
  //   response.send(body)
  // }).catch((error) => {
  //   body.error = error
  //   response.status(400).send(body)
  // })
})

function getDataForLasers(content) {
  console.log(content)
  var matches = content.match(/([\S]+)*/);
  console.log(JSON.stringify(matches) ); 
}

function permittedParamsFromBody(body) {
  return _.pick(body, [
    'lasers',
    'locations',
    'date'
  ])
}

export default Router
