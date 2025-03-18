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
  