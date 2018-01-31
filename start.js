var fs = require('fs');
var {calculate_fitness_method_A, calculate_fitness_method_B} = require('./fitness.js')
var {log_informations, generate_random_chromosome, is_the_chromosome_valid, initial_generation} = require('./initial_generation.js')
var {crossover_a, crossover_b} = require('./crossover.js')
var {mutation_a, mutation_b} = require('./mutation.js')

var open_var_info = (medians, demands) => {
  var test_count = 1000
  var fitness_avg_A = 0
  var fitness_A_array = []
  
  var fitness_avg_B = 0
  var fitness_B_array = []
  
  for(var i=0; i<test_count; i++){
    chromosome = generate_random_chromosome(medians.length, demands.length)
    // console.log(`chromsome: ${chromosome}`)
    is_valid = is_the_chromosome_valid(chromosome, medians, demands)
    // console.log(`chromosome is valid: ${is_valid}`)
  
    var generation = initial_generation(medians, demands, 1000)
    // console.log(`generation initialized: ${generation.length}`)
  
    var fitness_A = calculate_fitness_method_A(chromosome, medians, demands)
    var fitness_B = calculate_fitness_method_B(chromosome, medians, demands)
  
    fitness_avg_A += fitness_A
    fitness_A_array.push(fitness_A)
    fitness_avg_B += fitness_B
    fitness_B_array.push(fitness_B)
    // console.log(`fitness in method A: ${fitness_A}`)
    // console.log(`fitness in method B: ${fitness_B}`)
  }
  fitness_avg_A /= test_count
  fitness_A_varin = 0
  for(var i=0; i<fitness_A_array.length; i++)
    fitness_A_varin += Math.abs(fitness_avg_A - fitness_A_array[i])
  fitness_A_varin /= test_count
  
  fitness_avg_B /= test_count
  fitness_B_varin = 0
  for(var i=0; i<fitness_B_array.length; i++)
    fitness_B_varin += Math.abs(fitness_avg_B - fitness_B_array[i])
  fitness_B_varin /= test_count
  
  return {
    a: {
      avg: fitness_avg_A,
      varin: fitness_A_varin
    },
    b: {
      avg: fitness_avg_B,
      varin: fitness_B_varin
    }
  }
}

var open_random_problem = (map_bounds, max_demands, max_medians, max_capacity) => {
  var medians = []
  for(var i=0; i< parseInt(Math.random() * max_medians)+1; i++)
    medians.push({
      x: parseInt(Math.random() * Math.abs(map_bounds.maxx - map_bounds.minx)) + map_bounds.minx,
      y: parseInt(Math.random() * Math.abs(map_bounds.maxy - map_bounds.miny)) + map_bounds.miny,
      c: parseInt(Math.random() * max_capacity)
    })
  var demands = []
  for(var i=0; i< parseInt(Math.random() * max_demands)+1; i++)
    demands.push({
      x: parseInt(Math.random() * Math.abs(map_bounds.maxx - map_bounds.minx)) + map_bounds.minx,
      y: parseInt(Math.random() * Math.abs(map_bounds.maxy - map_bounds.miny)) + map_bounds.miny,
      c: parseInt(Math.random() * max_capacity)
    })

  return {medians, demands}
}

// var test = (test_count) => {
//   var avg_a = 0
//   var avg_b = 0

//   for(var i=0; i<test_count; i++){
//     var res = open_random_problem({maxx: 100, minx: 0, maxy: 100, miny: 0}, 20, 20, 1000)
//     avg_a += res.a.varin
//     avg_b += res.b.varin
//   }

//   avg_a /= test_count
//   avg_b /= test_count
//   console.log(`avg a => ${avg_a}`)
//   console.log(`avg b => ${avg_b}`)
// }

var sort_by_fitness = (generation, medians, demands, method) => {
  return generation.sort((ch1, ch2) => {
    if(method == 'A')
      return calculate_fitness_method_A(ch1, medians, demands) - calculate_fitness_method_A(ch2, medians, demands)
    if(method == 'B')
      return calculate_fitness_method_B(ch1, medians, demands) - calculate_fitness_method_B(ch2, medians, demands)
  })
}
var run_single_generation = (generation, medians, demands, method, kp, mp) => {
  generation = sort_by_fitness(generation, medians, demands, method)
  var original_lengh = generation.length
  generation.splice(0, kp*generation.length)
  while(generation.length < original_lengh){
    var parent_a = generation[parseInt(Math.random() * generation.length)]
    var parent_b = generation[parseInt(Math.random() * generation.length)]
    if(method == 'A')
      generation = generation.concat(crossover_a([parent_a, parent_b], medians.length, demands.length, mp))
    if(method == 'B')
      generation = generation.concat(crossover_b([parent_a, parent_b], medians.length, demands.length, mp))

  }
  for(var i=0; i<generation.length; i++){
    if(method == 'A')
      generation[i] = mutation_a(generation[i])
    if(method == 'B')
      generation[i] = mutation_b(generation[i])
  }
  generation = sort_by_fitness(generation, medians, demands, method)
  if(method == 'A'){
    console.log(`${calculate_fitness_method_A(generation[generation.length-1], medians, demands)}`)
    // console.log(`chromosome: ${generation[generation.length-1]}`)
  }else if(method == 'B'){
    console.log(`${calculate_fitness_method_B(generation[generation.length-1], medians, demands)}`)
    // console.log(`chromosome: ${generation[generation.length-1]}`)
  }
}
var run = (population, median_count, demand_count, max_itr, mp, kp, method = 'A') => {
  var units = open_random_problem({maxx: 100, minx: 0, maxy: 100, miny: 0}, 100, 100, 1000)
  generaion = initial_generation(units.medians, units.demands, population)
  for(var i=0; i<max_itr; i++){
    // console.log(`running generation ${i}`)
    run_single_generation(generaion, units.medians, units.demands, method, kp, mp)
    // break;
  }
}

run(2000, 20, 50, 20, 0.7, 0.25, 'B')
