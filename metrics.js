var initial_generation = require('./initial_generation.js')
var fitness = require('./fitness.js')

var open_var_info = (medians, demands, info) => {
  var population_size = info.p_size
  var fitness_avg_A = 0
  var fitness_A_array = []
  
  var fitness_avg_B = 0
  var fitness_B_array = []
  
  for(var i=0; i<population_size; i++){
    chromosome = initial_generation.generate_random_chromosome(medians.length, demands.length)
    // console.log(`chromsome: ${chromosome}`)
    is_valid = initial_generation.is_the_chromosome_valid(chromosome, medians, demands)
    // console.log(`chromosome is valid: ${is_valid}`)
  
    var generation = initial_generation.initial_generation(medians, demands, 1000)
    // console.log(`generation initialized: ${generation.length}`)
  
    var fitness_A = fitness.calculate_fitness_method_A(chromosome, medians, demands)
    var fitness_B = fitness.calculate_fitness_method_B(chromosome, medians, demands)
  
    fitness_avg_A += fitness_A
    fitness_A_array.push(fitness_A)
    fitness_avg_B += fitness_B
    fitness_B_array.push(fitness_B)
    // console.log(`fitness in method A: ${fitness_A}`)
    // console.log(`fitness in method B: ${fitness_B}`)
  }
  fitness_avg_A /= population_size
  fitness_A_varin_diff = info.ga_result
  fitness_A_varin = 0
  for(var i=0; i<fitness_A_array.length; i++)
    fitness_A_varin += Math.abs(fitness_avg_A - fitness_A_array[i])
  fitness_A_varin /= population_size + fitness_A_varin_diff
  
  fitness_avg_B /= population_size
  fitness_B_varin_diff = info.ade_result
  fitness_B_varin = 0
  for(var i=0; i<fitness_B_array.length; i++)
    fitness_B_varin += Math.abs(fitness_avg_B - fitness_B_array[i])
  fitness_B_varin /= population_size + fitness_B_varin_diff
  
  return {
    a: {
      avg: fitness_avg_A,
      varin: fitness_A_varin,
      result: fitness_A_varin_diff,
    },
    b: {
      avg: fitness_avg_B,
      varin: fitness_B_varin,
      result: fitness_B_varin_diff,
    }
  }
}

var open_problem = (test_case, info) => {
  var medians = []
  for(var i=0; i< test_case.p; i++)
    medians.push({
      x: test_case.edges.s,
      y: test_case.edges.d,
      c: test_case.edges.c
    })
  var demands = []
  for(var i=test_case.p; i< test_case.node_count; i++)
    demands.push({
      x: test_case.edges.s,
      y: test_case.edges.d,
      c: test_case.edges.c
    })

  return open_var_info(medians, demands, info)
}

module.exports = {
  open_problem,
}