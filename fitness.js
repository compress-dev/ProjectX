var sum_of_distance = (chromosome, medians, demands) => {
  var sum = 0
  for(var i=0; i<chromosome.length; i++){
    var demand = demands[i]
    var median = medians[chromosome[i]]
    var current_dst = Math.pow(demand.x - median.x, 2) + Math.pow(demand.y - median.y, 2)
    sum += current_dst
  }
  return sum
}

var worst_distance = (medians, demands) => {
  var worst = 0
  for(var i=0; i<demands.length; i++){
    var demand = demands[i]
    var worst_dst_for_current_demand = the_furthest_median(demand, medians)
    worst += worst_dst_for_current_demand
  }
  return worst
}

var the_furthest_median = (point, medians) => {
  var worst_dst = 0
  for(var i=0; i<medians.length; i++){
    if(Math.pow(point.x - medians[i].x, 2) + Math.pow(point.y - medians[i].y, 2) > worst_dst){
      worst_dst = Math.pow(point.x - medians[i].x, 2) + Math.pow(point.y - medians[i].y, 2)
    }
  }
  the_furthest_median_v = worst_dst
  return worst_dst
}

var min_cap_median = (medians) => {
  var min_cap = 999999999
  for(var i=0; i<medians.length; i++)
    if(min_cap > medians[i].c)
      min_cap = medians[i].c
  
  min_cap_median_v = min_cap
  return min_cap
}

var total_needs = (demands) => {
  var total = 0
  for(var i=0; i<demands.length; i++)
    total += demands[i].c
  total_needs_v = total
  return total
}

var the_greatest_lack = (demands, medians) => total_needs(demands) - min_cap_median(medians)

/* 
  main functions:
    calculate_fitness: function to calc the fitness of a chromose
*/

var calculate_fitness_method_A = (chromosome, medians, demands) =>  ((worst_distance(medians,demands) - sum_of_distance(chromosome, medians, demands))  / worst_distance(medians, demands)) * ((total_needs(demands) - min_cap_median(medians)) / total_needs(demands))

var calculate_fitness_method_B = (chromosome, medians, demands) =>  (((worst_distance(medians,demands) - sum_of_distance(chromosome, medians, demands)) / worst_distance(medians, demands)) + ((total_needs(demands) - min_cap_median(medians)) / total_needs(demands)))/2

module.exports = {
  calculate_fitness_method_A,
  calculate_fitness_method_B
}