var {calculate_fitness} = require('./fitness.js')
var {log_informations, generate_random_chromosome, is_the_chromosome_valid, initial_generation} = require('./initial_generation.js')

var medians = [
  {x: 2, y: 4, c: 100},
  {x: 3, y: 3, c: 50},
  {x: 6, y: 9, c: 300},
  {x: 2, y: 2, c: 100},
  {x: 0, y: 4, c: 150},
]

var demands = [
  {x: 0, y: 2, c: 100},
  {x: 4, y: 8, c: 50},
  {x: 2, y: 2, c: 125},
  {x: 2, y: 3, c: 50},
  {x: 6, y: 1, c: 75},
  {x: 3, y: 4, c: 125},
  {x: 4, y: 9, c: 125},
  {x: 5, y: 5, c: 50},
]

log_informations(medians, demands)
chromosome = generate_random_chromosome(medians.length, demands.length)
console.log(`chromsome: ${chromosome}`)
is_valid = is_the_chromosome_valid(chromosome, medians, demands)
console.log(`chromosome is valid: ${is_valid}`)

var generation = initial_generation(medians, demands, 1000)
console.log(`generation initialized: ${generation.length}`)