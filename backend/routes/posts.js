const express = require('express');

const Post = require('../models/post');

const router = express.Router();

router.post('', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(result => {
        res.status(201).json({
            message: 'Post Created',
            postId: result._id
        })
    })
    
})

router.get('', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: "Posts Fetched",
                posts: documents
            })
        })
})

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: "No Post Found"
                })
            }
        })
})

router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({_id: req.params.id }, post)
        .then(updatedPost => {
            console.log(updatedPost)
            res.status(200).json({
                message: "Update Success"
            })
        })
})

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
        .then(status => {
            res.status(200).json({
                message: 'Post Delete Success'
            })
        })
        .catch(err => console.log(err));
})


module.exports = router;