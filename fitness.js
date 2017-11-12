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

/******************************sum of worst distance just for test***********/
//test

var sum_of_worst_distances = 0;
var worst_distance_for_one_demand = -1; //for compare
console.log("initial:" + worst_distance_for_one_demand + "\n")
var array = array();
for (i = 0; i < 2; i++) {
    for (j = 0; j < medians.length; j++) {
        var distance = Math.sqrt((Math.pow(demands[i].x - medians[j].x, 2)) + (Math.pow(demands[i].y - medians[j].y, 2)))
        if (distance > worst_distance_for_one_demand) {
            worst_distance_for_one_demand = distance;
            console.log("distance of demand " + i + " and median " + j + " :" + worst_distance_for_one_demand + "\n")
            array[i] = worst_distance_for_one_demand;
        } else
            console.log("distance of demand " + i + " and median " + j + " :" + worst_distance_for_one_demand + "\n")
    }
    sum_of_worst_distances += worst_distance_for_one_demand;
}
console.log(array.join())


/***************************************************************************/

//generating new chromosome
var chromosome = []
for (var i = 0; i < demands.length; i++)
    chromosome[i] = parseInt(Math.random() * medians.length)

var calculate_fitness_article = (chromosome, demands, medians) => {
    var worse_distance = calculate_worst_distance(medians, demands);
    // var some_of_distances = calculate_sum_of_distances(chromosome, demands, medians);
    //n = needs
    //mc = min cost
    // retrun((worse_distance - some_of_distances) / worse_distance) * ((n - mc) / n);


}

var calculate_sum_of_distances = (chromosome, demands, medians) => {

    var sum = 0;
    var points = [];
    for (i = 0; i < chromosome.length; i++) {
        var demand = demands[i]
        var median = medians[chromosome[i]]
        sum += Math.sqrt(Math.pow(demand.x - median.x, 2) + Math.pow(demand.y - median.y, 2))
    }
    return sum;
}

var calculate_worst_distance = (medians, demands) => {
    var sum_of_worst_distances = 0;
    var worst_distance = -1; //for compare
    console.log("initial:" + worst_distance + "\n")
    for (i = 0; i < demands.length; i++) {
        for (j = 0; j < medians.length; j++) {
            var distance = Math.sqrt(Math.pow(demands[i].x - medians[j].x, 2) + Math.pow(demands[i].y - medians[j].y, 2))
            console.log("before compare:" + worst_distance + "\n")
            if (distance > worst_distance) {
                worst_distance = distance;
                console.log("new :" + worst_distance + "\n")
            }
        }
    }
}


// var calculate_fitness_custom = (chromosome) => {
//         //worse_distance = worse distance
//         //some_of_distances = sum of distances 
//         //n = needs
//         //mc = min cost
//         retrun((alpha * ((worse_distance - some_of_distances) / worse_distance)) + (beta * ((n - mc) / n))) / 2;

//     }
// module.exports = {
//     calculate_fitness
// }