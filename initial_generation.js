var log_informations = (medians, demands) => {
  var total_capacities = 0
  console.log(`medians: ${medians.length}:`)
  for(var i=0; i<medians.length; i++){
    console.log(`${i}: loc(${medians[i].x},${medians[i].y}) => c(${medians[i].c})`)
    total_capacities += medians[i].c
  }
  console.log(`total capacities: ${total_capacities}`)
  
  console.log('============================================')
  var total_needs = 0
  console.log(`demands: ${demands.length}:`)
  for(var i=0; i<demands.length; i++){
    console.log(`${i}: loc(${demands[i].x},${demands[i].y}) => c(${demands[i].c})`)
    total_needs += demands[i].c
  }
  console.log(`total capacities: ${total_needs}`)
}

var generate_random_chromosome = (p, n) => {
  var chromosome = []
  for(var i=0; i<n; i++)
    chromosome[i] = parseInt(Math.random() * p)
  return chromosome
}

var is_the_chromosome_valid = (chromosome, medians, demands) => {
  var needs = []
  for(var i=0; i<medians.length; i++)
    needs[i] = 0
  for(var i=0; i<chromosome.length; i++)
    needs[chromosome[i]] += demands[i].c
  console.log(needs)
  for(var i=0; i<needs.length; i++)
    if(needs[i] > medians[i].c)
      return false
  return true
}

var get_total_needs = (demands) => {
  var total_needs = 0
  for(var i=0; i<demands.length; i++)
    total_needs += demands[i].c
  return total_needs
}

var get_total_capacity = (medians) => {
  var total_capacities = 0
  for(var i=0; i<medians.length; i++)
    total_capacities += medians[i].c
  return total_capacities
}

var initial_generation = (medians , demands, size) => {
  var p = medians.length
  var n = demands.length
  var generation = []
  for(var i=0; i<size; i++)
    generation[i] = generate_random_chromosome(p, n)
  
  return generation
}
module.exports = {
  is_the_chromosome_valid,
  generate_random_chromosome,
  initial_generation,
  log_informations,

  get_total_capacity,
  get_total_needs,
}