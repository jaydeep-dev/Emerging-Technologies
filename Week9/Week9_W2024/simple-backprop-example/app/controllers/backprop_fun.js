//get math functions from mathjs
const {random, multiply, dotMultiply, mean, abs, subtract, transpose, add} = require('mathjs')
//
/*
***************************************************
* BackProp algorithm for a simple MLP
* *************************************************
*/
exports.backPropFun = function (...args) {
    //
    var model = {};
    // extract arguments
    var nrOfInputNodes = args[0];
    var nrOfHiddenNodes = args[1];
    var nrOfOutputNodes = args[2];
    var epochs = args[3];
    var alpha = args[4]
    var activation = args[5]
    //
    // initialize weights
    // W1 is the weight matrix between the input layer and hidden layer
    var W1 = random([nrOfInputNodes, nrOfHiddenNodes], -1.0, 1.0);
    // W2 is the weight matrix between the hidden layer and output layer
    var W2 = random([nrOfHiddenNodes, nrOfOutputNodes], -1.0, 1.0);
    // train the model using backpropagation algorithm
    model.train = function(input, target) {
        for (let i = 0; i < epochs; i++) {
            // ******************
            // foward propagation
            // ******************
            let x = input;
            // calculate the weighted sum of hidden nodes
            let v1 = multiply(x, W1);
            // pass the weighted sum to the activation function
            // this gives the outputs from hidden layer
            let y1 = v1.map(node => activation(node, false));
            // calculate the weighted sum of the output layer
            let v = multiply(y1, W2);
            // pass it to the activation function, this returns the output of the third layer
            let y = v.map(node => activation(node, false))
            // *********************
            // backward propagation 
            // *********************
            // calculate the error, difference between correct output and computed output
            let e = subtract(target, y);
            // calculate delta, derivative of the activation function times the error
            let delta = dotMultiply(e, v.map(node => activation(node, true)));
            // propagate the output node delta, δ, backward, and calculate the deltas of the hidden layer
            let e1 = multiply(delta, transpose(W2));
            let delta1 = dotMultiply(e1, v1.map(node => activation(node, true)));
            // gradient descent - adjust the weights according to the learning rule   
            W2 = add(W2, multiply(transpose(y1), multiply(delta, alpha)));
            W1 = add(W1, multiply(transpose(x), multiply(delta1, alpha)));
            // print error every 1000 epochs
            if (i % 10000 == 0)
                console.log(`Error: ${mean(abs(e))}`);
        }
    }
    //
    model.predict = function(input) {
        let x = input;
        // calculate the weighted sum of hidden nodes and pass it to activation function
        let y1 = multiply(x, W1).map(node => activation(node, false));
        // // calculate the weighted sum of output nodes and pass it to activation function
        let output = multiply(y1, W2).map(node => activation(node, false));
        return output;
    }
    return model;
};
