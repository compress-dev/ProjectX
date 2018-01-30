var fs = require('fs');
var {calculate_fitness_method_A, calculate_fitness_method_B} = require('./fitness.js')
var {log_informations, generate_random_chromosome, is_the_chromosome_valid, initial_generation} = require('./initial_generation.js')
var metrics = require('./metrics.js')
var tests = require('./test-cases.js').test_cases;

// log_informations(medians, demands)
// metrics.test(400)

var get_file = (test_case) => {
  content = fs.readFileSync(`./tests/${test_case.filename}`).toString();
  lines = content.split('\n')
  info_part = lines[0].split(' ')
  results = {
    node_count: info_part[1],
    edge_count: info_part[2],
    p: info_part[3],
    edges: []
  }
  for(var i=1; i<lines.length; i++){
    line = lines[i]
    parts = line.split(' ')
    results.edges[i-1] = {
      s: parseInt(parts[1]),
      d: parseInt(parts[2]),
      c: parseInt(parts[3]),
    }
  }
  return results
}

var generate_matrix = (input) => {
  matrix = []
  for(var i=1; i<=input.node_count; i++){
    matrix[i] = []
    for(var j=1; j<=input.node_count; j++)
      matrix[i][j] = -1;
  }
  for(var i=0; i<input.edge_count; i++){
    edge = input.edges[i]
    matrix[edge.s][edge.d] = edge.c
  }
  return matrix
}

var handle_test_case = (test_case) => {
  test_input = get_file(test_case)
  matrix = generate_matrix(test_input)
  console.log(`node count: ${test_input.node_count}`)
  console.log(`edge count: ${test_input.edge_count}`)
  console.log(`p count: ${test_input.p}`)
  var res = metrics.open_problem(test_input, test_case)
  console.log(`Our result was: ${res.b.result}`)
}

for(var i=0; i<tests.length; i++){
  console.log("starting new test:")
  var test_case = tests[i]
  console.log(`title: ${test_case.title}`)
  console.log(`population: ${test_case.p_size}`)
  console.log(`mutation posibility ${test_case.mp}`)
  console.log(`max iteration: ${test_case.max_itr}`) 
  console.log(`the optimum result is ${test_case.opt_result}`)
  console.log(`the GA paper result is ${test_case.ga_result}`)
  handle_test_case(test_case)
  console.log("======================================")
  // break
}