var medians = [
    { x: 0, y: 4, c: 100 },
    { x: 3, y: 3, c: 50 },
    { x: 6, y: 9, c: 300 },
    { x: 2, y: 2, c: 100 },
    { x: 0, y: 4, c: 150 },
]

var demands = [
    { x: 0, y: 2, c: 100 },
    { x: 0, y: 8, c: 50 },
    { x: 0, y: 2, c: 125 },
    { x: 0, y: 3, c: 50 },
    { x: 0, y: 1, c: 75 },
    { x: 0, y: 4, c: 125 },
    { x: 0, y: 9, c: 125 },
    { x: 1, y: 5, c: 50 },
]

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
  for(var i=0; i<medians.length; i++)
    if(Math.pow(point.x - median.x, 2) + Math.pow(point.y - median.y, 2) > worst_distance)
      worst_distance = Math.pow(point.x - median.x, 2) + Math.pow(point.y - median.y, 2)
  return worst_distance
}

var min_cap_median = (medians) => {
  var min_cap = 999999999
  for(var i=0; i<medians.length; i++)
    if(min_cap > medians[i].c)
      min_cap = medians[i].c
  return min_cap
}

var total_needs = (demands) => {
  var total = 0
  for(var i=0; i<demands.length; i++)
    total += demands.c
}

var the_greatest_lack = (demands, medians) => total_needs(demands) - min_cap_median(medians)