var crossover_a = (parents, m, n, crossover_probability) => {
  var childs = [[], []]
  for(var i=0; i<n; i++){
    if(Math.random() >= crossover_probability){
      childs[0][i] = parents[0][i]
      childs[1][i] = parents[1][i]
    }else{
      console.log(`swap on ${i}`)
      childs[1][i] = parents[0][i]
      childs[0][i] = parents[1][i]
    }
  }
  return childs
}

var crossover_b = (parents, m, n, crossover_probability) => {
  for(var i=0; i<n; i++){
    var first_index = Math.floor(Math.random() *n)
    var second_index = Math.floor(Math.random() *n)
    console.log(`swap on ${first_index} and ${second_index}`)
    var temp = parents[0][first_index]
    parents[0][first_index] = parents[1][second_index]
    parents[1][second_index] = temp
  }
  return parents
}

var parents = [
    [3, 5, 3, 2, 6, 3, 1, 0],
    [3, 4, 8, 4, 1, 4, 2, 8]
  ]
var m = 9
var n = parents[0].length

console.log(parents)
console.log(crossover_a(parents, m, n, 0.1))