// Import Model
import { Road } from '../models/roads'
import Coordinates from 'coordinate-parser';

const lasersQuantity = 2

export class RoadsController {
  static async getAll() {
    try {
      let roadsSearch = await Road.find().sort('-date')
      let roads = []
      roadsSearch.forEach(road => {
        roads.push(formatRoad(road))
      });
      return roads
    } catch (error) {
      throw generateError(error)
    }
  }

  static async getRoad(roadId) {
    try {
      let road = await Road.findOne({ _id: roadId })
      return formatRoad(road)
    } catch (error) {
      throw generateError(error)
    }
  }

  static async getLastRoad() {
    try {
      let road = await Road.findOne().sort('-date')
      return formatRoad(road, true)
    } catch (error) {
      throw generateError(error)
    }
  }

  static async createOne(roadParams) {
    try {
      const lastRoad = await this.getLastRoad()
      const actualNumber = lastRoad.number + 1
      const name = 'Road ' + actualNumber
      const road = await new Road({ name, number: actualNumber, ...roadParams }).save()
      return road._id
    } catch(error) {
      throw generateError(error)
    }
  }

  static async addRoad(lasers, locations) {
    try {
      const lasersFormatted = formatLasers(lasers)
      const locationsFormatted = formatLocations(locations)

      return await this.createOne({ lasers: lasersFormatted, locations: locationsFormatted })
    } catch(error) {
      throw generateError(error)
    }
  }
}

function formatLasers(data) {
  let lasers = []
  let actualIndex = 0
  for (let index = 0; index < lasersQuantity; index++) {
    lasers[index] = []
  }
  data.forEach(element => {
    lasers[actualIndex].push(element)
    actualIndex++
    actualIndex = actualIndex == lasersQuantity ? 0 : actualIndex
  });

  return lasers
}

function formatLocations(data) {
  let locations = []
  let needToRead = true
  data.forEach(element => {
    if (needToRead) {
      const matches = element.split(',')
      const aux = matches[0] + matches[1] + ' ' + matches[2] + matches[3]
      const position = new Coordinates(aux);
      locations.push({
        latitude: position.getLatitude(),
        longitude: position.getLongitude()
      })
    }

    needToRead = !needToRead
  });

  return locations
}

function formatRoad(road, withNumber = false) {
  if (road !== null) {
    let formatted = {
      identifier: road._id,
      name: road.name,
      lasers: road.lasers,
      locations: road.locations,
      date: road.date
    }
    if (withNumber) {
      formatted.number = road.number
    }
    return formatted
  }

  if (withNumber) {
    return { number: 0 }
  }
  return null
}

function generateError(error, title = 'Requisição inválida', fatal = false) {
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
