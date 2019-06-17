// Modules import
import express from 'express'
import _ from 'lodash'

// Import controller
import { RoadsController } from '../controllers/roads'

const Router = express.Router()

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
  let user = request.road

  let roadParams = { ...permittedParamsFromBody(request.body) }
  RoadsController.createOne(roadParams).then((road) => {
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

function permittedParamsFromBody(body) {
  return _.pick(body, ['name', 'start','end', 'lasers', 'trajectory'])
}

export default Router
