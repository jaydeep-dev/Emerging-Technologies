// Create a new 'render' controller method
exports.render = function (req, res) {

  // Use the 'response' object to render the 'index' view with a 'title' property
  res.render('index', {
    title: 'Simple Perceptron Example'
  });
};
// 
exports.linearClassifier = function (req, res) {


  //
  //Friendly or not friendly example using teeth and size features
  //
  //normalized teeth and size features
  //X1 data - teeth number - is scaled to [0,1]
  var X1 = [0.27, 0.09, 0.00, 0.23, 0., 1.00, 0.32, 0.9];
  //X2 data - size scaled to [0,1]
  var X2 = [0.50, 0.48, 0.12, 0.00, 1.00, 0.73, 0.33, 0.3];

  //labels data or the output
  var labels = [1, 1, 1, 0, 1, 0, 0];

  var data = [];

  // Create the model
  var p = perceptron();
  // Train the model using 100 iterations
  for (var i = 0; i < 100; i++) {
    for (let i = 0; i < X1.length; i++) {
      p.train([X1[i], X2[i]], labels[i]);
    }
  }
  //
  console.log('weights and bias: ')
  console.log('bias: ', p.bias)
  console.log('weights: ', p.weights)
  var weights = p.weights;
  bias = p.bias;

  //y = (-w1/w2)x + (-bias/w2) = a*x + b
  //line coefficients
  var a = -weights[0] / weights[1];
  var b = -bias / weights[1];

  console.log('a and b: ')

  console.log(a)
  console.log(b)
  //calculating tw0 points to draw the line
  //x2 = a*x1 +b : x1 = 0 --> x2 = b, x1 = 1 --> x2 = a + b
  // line points:  (0,b) and (1, a+b)

  //It is important to notice that it will converge to any solution
  //that satisfies the training set.
  //Try to retrain to see if it changes.

  // Now we can use it to categorize samples it's never seen.
  // For example: something with 29 teeth and a size of 23 cm, likely to be nice?
  predictionResult = p.predict([
    "0.1", //teeth number
    "0.3" //size of the animal
  ]);

  console.log("prediction: ", predictionResult);
  //prepare data values for the chart
  for (let i = 0; i < X1.length; i++) {
    data[i] = { x: X1[i], y: X2[i] };
  }
  console.log('data: ', data[0])
  console.log('data: ', data)

  // Use the 'response' object to render the 'index' view with a 'classificationResult' property
  res.render('./results.ejs', {
    dataPoints: data,
    predictionResult: predictionResult,
    a: a,
    b: b,
  });

};

exports.AND = function (req, res) {
    //#region  My Region
  ////////
  // Define the input/output pairs for the AND function
  const trainingData = [
    [[0, 0], 0],
    [[0, 1], 0],
    [[1, 0], 0],
    [[1, 1], 1],
  ];
  // Initialize the weights and bias to small random values
  let weight1 = 0.1;
  let weight2 = 0.2;
  let bias = -0.1;
  // Set the learning rate and the number of iterations
  const learningRate = 0.1;
  const numIterations = 3;
  // Define the step function
  function step(x) {
    return x > 0 ? 1 : 0;
  }
  // Define the perceptron function
  function perceptron(inputs) {
    const weightedSum = weight1 * inputs[0] + weight2 * inputs[1] + bias;
    const output = step(weightedSum);
    return output;
  }
  // Train the perceptron model using the delta rule
  for (let i = 0; i < numIterations; i++) {
    console.log(`Iteration ${i + 1}:`);
    for (const [inputs, desiredOutput] of trainingData) {
      // Compute the predicted output and error
      const predictedOutput = perceptron(inputs);
      const error = desiredOutput - predictedOutput;
      // Update the weights and bias using the delta rule
      weight1 += learningRate * error * inputs[0];
      weight2 += learningRate * error * inputs[1];
      bias += learningRate * error;
      console.log(`Input: ${inputs}, Desired Output: ${desiredOutput}, Predicted Output: ${predictedOutput}, Error: ${error.toFixed(2)}, Updated Weights: (${weight1.toFixed(2)}, ${weight2.toFixed(2)}), Updated Bias: ${bias.toFixed(2)}`);
    }
  }
  // Verify that the final weights and bias correctly model the AND function
  console.log(`Final Weights: (${weight1.toFixed(2)}, ${weight2.toFixed(2)})`);
  console.log(`Final Bias: ${bias.toFixed(2)}`);
  console.log(`Output for (0, 0): ${perceptron([0, 0])}`);
  console.log(`Output for (0, 1): ${perceptron([0, 1])}`);
  console.log(`Output for (1, 0): ${perceptron([1, 0])}`);
  console.log(`Output for (1, 1): ${perceptron([1, 1])}`);
  ///////
  //#endregion
}

exports.OR = function (req, res) {
  //#region  My Region
////////
// Define the input/output pairs for the AND function
const trainingData = [
  [[0, 0], 0],
  [[0, 1], 1],
  [[1, 0], 1],
  [[1, 1], 1],
];
// Initialize the weights and bias to small random values
let weight1 = 0.1;
let weight2 = 0.2;
let bias = -0.1;
// Set the learning rate and the number of iterations
const learningRate = 0.1;
const numIterations = 3;
// Define the step function
function step(x) {
  return x > 0 ? 1 : 0;
}
// Define the perceptron function
function perceptron(inputs) {
  const weightedSum = weight1 * inputs[0] + weight2 * inputs[1] + bias;
  const output = step(weightedSum);
  return output;
}
// Train the perceptron model using the delta rule
for (let i = 0; i < numIterations; i++) {
  console.log(`Iteration ${i + 1}:`);
  for (const [inputs, desiredOutput] of trainingData) {
    // Compute the predicted output and error
    const predictedOutput = perceptron(inputs);
    const error = desiredOutput - predictedOutput;
    // Update the weights and bias using the delta rule
    weight1 += learningRate * error * inputs[0];
    weight2 += learningRate * error * inputs[1];
    bias += learningRate * error;
    console.log(`Input: ${inputs}, Desired Output: ${desiredOutput}, Predicted Output: ${predictedOutput}, Error: ${error.toFixed(2)}, Updated Weights: (${weight1.toFixed(2)}, ${weight2.toFixed(2)}), Updated Bias: ${bias.toFixed(2)}`);
  }
}
// Verify that the final weights and bias correctly model the AND function
console.log(`Final Weights: (${weight1.toFixed(2)}, ${weight2.toFixed(2)})`);
console.log(`Final Bias: ${bias.toFixed(2)}`);
console.log(`Output for (0, 0): ${perceptron([0, 0])}`);
console.log(`Output for (0, 1): ${perceptron([0, 1])}`);
console.log(`Output for (1, 0): ${perceptron([1, 0])}`);
console.log(`Output for (1, 1): ${perceptron([1, 1])}`);
///////
//#endregion
}


// Using perceptron with AND gate data
exports.perceptronFunctionClassifier = function (req, res) {
  // Create a perceptron model
  var p = perceptron()
  //
  // Train the model with input AND gate data
  for (var i = 0; i < 10; i++) {
    p.train([1, 1], 1);
    p.train([0, 1], 0);
    p.train([1, 0], 0);
    p.train([0, 0], 0);
  }
  //
  console.log('weights: ', p.weights);
  console.log('bias: ', p.bias);
  // 
  p.predict([0, 0]); // 0
  //p.predict([1,1]); //

  // The perceptron has learned enough to classify correctly:
  result = p.predict([1, 0])
  console.log('perceptron function:', result)

  // Use the 'response' object to render the 'index' view with a 'classificationResult' property
  res.render('./perceptron_results.ejs', {
    classificationResult: JSON.stringify(result)

  });

};
// 
// The perceptron model
// 
function perceptron() {
  // The perceptron model
  var model = {};
  var weights = [];
  // The bias term, or intercept; it is also a weight but
  // it's stored separately for convenience as it is always
  // multiplied by one.
  var bias = 0;
  //
  // Use an array of features with the weight array and bias
  // to predict whether an example is labeled 0 or 1.
  model.predict = function (features) {
    // Only predict if previously trained
    // on the same size feature array(s).
    if (features.length !== weights.length) {
      return null;
    }
    // Calculate the sum of features times weights,
    // with the bias added (implicitly times one).
    //console.log('in predict function')
    let score = 0;
    for (let i = 0; i < weights.length; i++) {
      //console.log('weights[i]: ', weights[i])
      //console.log('features[i]: ', features[i])
      score += weights[i] * features[i];
    }
    score += bias;
    // Step function
    return score > 0 ? 1 : 0;
  } // end of predict
  //
  // Train the classifier with a new example, which is
  // a numeric array of features and a 0 or 1 label.
  model.train = function (features, label) {
    // Require that only labels of 0 or 1 are considered.
    if (label !== 0 && label !== 1) {
      return null;
    }
    // The length of the feature array determines
    // the length of the weight array.
    // The perceptron will continue learning as long as
    // it keeps seeing feature arrays of the same length.
    // When it sees a new data shape, it initializes.      
    if (features.length !== weights.length) {
      weights = features;
      bias = 1;
    }
    //
    console.log('in train function, features: ', features)
    // Make a prediction based on current weights.
    const prediction = model.predict(features);
    // Update the weights if the prediction is wrong.
    if (prediction !== label) {
      const gradient = label - prediction; //// how far off are we?
      for (let i = 0; i < weights.length; i++) {
        weights[i] += gradient * features[i]; //The perceptron update rule

      }
      console.log('weights: ', weights);
      bias += gradient;
      console.log('bias: ', bias);
      model.weights = weights;
      model.bias = bias;
    }

    return model; // return model with updated weights and bias
  };


  // Return the model
  return model;

};
//
// End of perceptron model