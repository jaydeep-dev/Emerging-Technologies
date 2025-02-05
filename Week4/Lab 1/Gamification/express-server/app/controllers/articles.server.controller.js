const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const User = require('mongoose').model('User');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const game = new Game();
    game.title = req.body.title;
    game.genre = req.body.genre;
    game.platform = req.body.platform;
    game.releaseYear = req.body.releaseYear;
    game.developer = req.body.developer;
    game.rating = req.body.rating;
    game.description = req.body.description;
    console.log("HIYA")
    console.log(req.body)
    console.log('req.user._id', req.id);

    game.save((err, result) => {
        if (err) {
            console.log('error', getErrorMessage(err))

            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            console.log("Save Response", result)
            res.status(200).json(game);
        }
    });
};
//
exports.list = function (req, res) {
    Game.find().sort('-title').exec((err, articles) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(articles);
        }
    });
};
//
exports.articleByID = function (req, res, next, id) {
    Game.findById(id).exec((err, article) => {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article '
            + id));
        req.article = article;
        console.log('in articleById:', req.article)
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.article);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.article)
    const game = req.article;   
    game.title = req.body.title;
    game.genre = req.body.genre;
    game.platform = req.body.platform;
    game.releaseYear = req.body.releaseYear;
    game.developer = req.body.developer;
    game.rating = req.body.rating;
    game.description = req.body.description;
    game.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(game);
        }
    });
};
//
exports.delete = function (req, res) {
    const article = req.article;
    article.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(article);
        }
    });
};
//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
exports.hasAuthorization = function (req, res, next) {
    //console.log('in hasAuthorization - creator: ', req.article.creator)
    //console.log('in hasAuthorization - user: ', req.id)
    //console.log('in hasAuthorization - user: ',req.user._id)

    next();
};
