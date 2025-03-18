//load tf libraries
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
//
// handling a GET request made to the '/' path
exports.render = function (req, res) {
    res.render('index', {
            info: "Choose the model and check the results in terminal window"
        }
    )
};
//
exports.classifier = function (req, res) {
    //XOR - ytrain stores xor logic gate results respectively as one-hot encoded.
    //XOR result [1, 0] refers to firing 0 whereas [0, 1] refers to firing 1.
    async function run() {
        const model = tf.sequential(); //linear stack of layers
        // the input layer, consisting of 2 neurons is passed to a layer of 4 neurons. 
        model.add(tf.layers.dense({ units: 4, activation: 'sigmoid', inputShape: [2] }));
        // the output layer has 2 neurons 
        model.add(tf.layers.dense({ units: 2, activation: 'softmax', outputShape: [2] }));
        // loss function and algorithm
        model.compile({ loss: 'categoricalCrossentropy', optimizer: tf.train.adam(0.1) });
        // training data
        // xtrain inputs
        const xtrain = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]]);
        // ytrain stores xor logic gate results respectively as one-hot encoded
        const ytrain = tf.tensor2d([[1, 0], [0, 1], [0, 1], [1, 0]]);
        //train the model with training data and number of iterations
        const history = model.fit(xtrain, ytrain, { epochs: 200 })
            .then(() => {
                console.log("fit is over")
                //model.predict(tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]])).print();
                model.predict(xtrain).print();
            });
    }
    run();
}; //end of classifier
//
//
exports.xorClassifier = function (req, res) {
    async function xor_model() {
        try {
            /*
             Solve for XOR (returns true if only one, but not both, 
              of its inputs is true).
                --------------------------------
                | input 1 | input 2 | OR | XOR |
                --------------------------------
                |    0    |    0    |  0 |  0  |
                |    0    |    1    |  1 |  1  |
                |    1    |    0    |  1 |  1  |
                |    1    |    1    |  1 |  0  |
                --------------------------------
            */
           
            const LEARNING_RATE = 0.05;
            const EPOCHS = 5000;
            
            const model = tf.sequential();
            //
            const xs_train = tf.tensor2d([
                [0, 0],
                [1, 0],
                [0, 1],
                [1, 1]
            ]);
            const ys_train = tf.tensor2d([
                [0],
                [1],
                [1],
                [0]
            ]);
            //
            model.add(tf.layers.dense({
                inputShape: [2], //dimensions of the input layer
                units: 4, //dimensions of second layer
                activation: 'sigmoid'
            }));
            model.add(tf.layers.dense({
                units: 1, //dimensions of output space
                activation: 'sigmoid'
            }));
            //
            const optimizer = tf.train.adam(LEARNING_RATE);
            // compile the model
            model.compile({
                optimizer: optimizer,
                loss: 'meanSquaredError'
            });
            //
            // Train the model
            const history = await model.fit(xs_train, ys_train, {
                epochs: EPOCHS,
                validationData: [xs_train, ys_train],
            });
            console.log('Training complete');
            
            // Try the model on values 0,0 and 1,1
            const inputs = tf.tensor2d([
                [0, 0],
                [1, 1]
            ]);
            const predictedOutput = model.predict(inputs);
            const predictedValues = Array.from(predictedOutput.dataSync());
            console.log('Predictions for inputs [0,0] and [1,1]:', predictedValues);
            
            res.status(200).send('Training complete. Check console for predictions.');
        } catch (error) {
            console.error('Error during model training or prediction:', error);
            res.status(500).send('An error occurred during model training or prediction.');
        }
    }
    xor_model();
}; //end of xorClassifier

