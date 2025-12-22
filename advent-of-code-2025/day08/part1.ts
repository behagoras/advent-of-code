import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));


type X = number
type Y = number
type Z = number
type Coordinate = [
  X, Y, Z
]

function getEuclidesDistance(coordinate1: string, coordinate2: string) {
  const [x1, y1, z1] = mapToCoordinate(coordinate1)
  const [x2, y2, z2] = mapToCoordinate(coordinate2)
  const d = Math.sqrt(
    Math.pow(x2 - x1, 2) +
    Math.pow(y2 - y1, 2) +
    Math.pow(z2 - z1, 2)
  )
  return d
}

function encodeCoordinates(coordinates: string[]): string {
  return coordinates.toSorted((a, b) => a.localeCompare(b)).join('-')
}

function mapToCoordinate(element: string): Coordinate {
  const [x, y, z] = element.split(',')
  return [+x!, +y!, +z!]
}

function mapFromCoordinates(coordinate: Coordinate): string {
  return JSON.stringify(coordinate)
}

// Day 08 part 1, example output ->
const part1 = (coordinates: string[]) => {
  // console.log("🚀 ~ part1 ~ input:", coordinates)

  const cache = new Map<string, number>()
  const pairs = new Map()

  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i; j < coordinates.length; j++) {
      const coordinate1 = coordinates[i]
      const coordinate2 = coordinates[j]
      if (coordinate1 && coordinate2) {
        const euclides = getEuclidesDistance(coordinate1, coordinate2)
        const key = encodeCoordinates([coordinate1, coordinate2])
        if (!cache.has(coordinate1)) cache.set(key, euclides)
      }
    }
  }
  // console.log(JSON.stringify([...cache].filter(el => !!el[1]), null, 2))
  const cache2 = new Map()
  for (let [key, value] of cache) {
    const [x1, y1, z1, x2, y2, z2] = key.split(',')

    const element1 = [x1, y1, z1]
    const element2 = [x2, y2, z2]
    const cached = cache2.get(element1.toString()) || []
    cached.push([element2, value])
    cache2.set(element1.toString(), cached)
  }


  console.log(
    JSON.stringify([...cache2], null, 2)
  )



}

const inputFile = path.resolve(__dirname, 'sample-input.txt');
const data = (await fs.readFile(inputFile, 'utf8')).split('\n').filter(Boolean)
console.log(part1(data));
