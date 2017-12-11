var mutation_a = (chromosome, mute_probability, m, n) => {
  for(var i=0; i<chromosome.length; i++){
    if(Math.random() < mute_probability){
      // console.log(`mute on gene ${i}`)
      chromosome[i] = Math.floor(Math.random() *m)
    }
  }
  return chromosome
}

var mutation_b = (chromosome, mute_probability, m, n) => {
  var swap_counts = Math.floor(mute_probability *n)
  for(var i=0; i<swap_counts; i++){
    var first_index = Math.floor(Math.random() *n)
    var second_index = Math.floor(Math.random() *n)
    // console.log(`swap on ${first_index} and ${second_index}`)
    var temp = chromosome[first_index]
    chromosome[first_index] = chromosome[second_index]
    chromosome[second_index] = temp
  }
  return chromosome
}

module.exports = {
  mutation_a,
  mutation_b,
}