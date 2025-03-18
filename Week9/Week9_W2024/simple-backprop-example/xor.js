const X = [
    [0, 0, 1],
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ];
  const D = [
    [0],
    [1],
    [1],
    [0]
  ];
  
  const sigmoid = x => 1 / (1 + Math.exp(-x));
  
  // Number of training data
  const N = 4;
  let W1 = [...Array(4)].map(() => [...Array(3)].map(() => 2 * Math.random() - 1));
  // W2 is a 1x4 matrix with random values between -1 and 1
  let W2 = [[...Array(4)].map(() => 2 * Math.random() - 1)];
  
  for (let epoch = 1; epoch <= 10000; epoch++) {
      [W1, W2] = backprop(W1, W2, X, D, N);
  }
  
  // Calculate and print the output
  for (let k = 0; k < N; k++) {
      const x = X[k].slice();
      const d = D[k];
  
      const v1 = W1.map(row => row.reduce((acc, val, i) => acc + val * x[i], 0));
      const y1 = v1.map(sigmoid);
  
      const v = W2[0].reduce((acc, val, i) => acc + val * y1[i], 0);
      // print weights as martices
      console.log(`W1=${W1}`);
      console.log(`W2=${W2}`);
      // print output
      const y = sigmoid(v);
      console.log(`y=${y}`);
  }
  // Backpropagation function
  function backprop(W1, W2, X, D, N) {
      const alpha = 0.9; // learning rate
  
      for (let k = 0; k < N; k++) {
          const x = X[k].slice(); // inputs from training data
          const d = D[k]; // correct output from training data
  
          const v1 = W1.map(row => row.reduce((acc, val, i) => acc + val * x[i], 0));
          const y1 = v1.map(sigmoid);
          // compute the weighted sum of the output layer's nodes (v)
          const v = W2[0].reduce((acc, val, i) => acc + val * y1[i], 0);
          const y = sigmoid(v);
          // compute the error (e) between the correct output (d) and the
          const e = d - y;
          const delta = y * (1 - y) * e;
  
          const e1 = W2[0].map((w, i) => w * delta);
          const delta1 = y1.map((y1i, i) => y1i * (1 - y1i) * e1[i]);
          W1.forEach((row, i) => {
              row.forEach((_, j) => {
                  W1[i][j] += alpha * delta1[i] * x[j];
              });
          });
  
          W2[0].forEach((_, i) => {
              W2[0][i] += alpha * delta * y1[i];
          });
      }
      // Return the updated weights
      return [W1, W2];
  }