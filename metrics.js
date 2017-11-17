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

  return open_var_info(medians, demands)
}

var test = (test_count) => {
  var avg_a = 0
  var avg_b = 0

  for(var i=0; i<test_count; i++){
    var res = open_random_problem({maxx: 100, minx: 0, maxy: 100, miny: 0}, 20, 20, 1000)
    avg_a += res.a.varin
    avg_b += res.b.varin
  }

  avg_a /= test_count
  avg_b /= test_count
  console.log(`avg a => ${avg_a}`)
  console.log(`avg b => ${avg_b}`)
}

module.exports = {
  test,
}