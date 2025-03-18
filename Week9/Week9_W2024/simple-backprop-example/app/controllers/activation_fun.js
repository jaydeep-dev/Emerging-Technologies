const {exp} = require('mathjs')
//
// computes sigmoid or its derivative
exports.sigmoid = function (x, derivative) {
    let fx = 1 / (1 + exp(-x));
    if (derivative)
        return fx * (1 - fx);
    return fx;
}