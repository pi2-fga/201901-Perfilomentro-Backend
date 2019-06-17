// Import Model
import { Road } from '../models/roads'

export class RoadsController {
  static async getAll() {
    try {
      return await Road.find().sort('-start')
    } catch (error) {
      throw generateError(error)
    }
  }

  static async getRoad(roadId) {
    try {
      return await Road.find({
        _id: roadId
      })
    } catch (error) {
      throw generateError(error)
    }
  }

  static async createOne(roadParams) {
    try {
      const road = new Road(roadParams)
      return await road.save()
    } catch(error) {
      console.log(error)
      throw generateError(error)
    }
  }
}

function generateError(error, title='Requisição inválida', fatal=false) {
  if (error.errors) {
    error = Object.values(error.errors)[0].message
  }

  return {
    title: title,
    message: error,
    kind: "roadController",
    fatal,
  }
}
