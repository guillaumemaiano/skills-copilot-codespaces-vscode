// create server
const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');

router.get('/posts/:postId/comments/new', (req, res) => {
    // find post by id
    Post.findById(req.params.postId, (err, post) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', { post: post });
        }
    });
});

router.post('/posts/:postId/comments', (req, res) => {
    // lookup post using id
    Post.findById(req.params.postId, (err, post) => {
        if (err) {
            console.log(err);
            res.redirect('/posts');
        } else {
            // create new comment
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    // connect new comment to post
                    post.comments.push(comment);
                    post.save();
                    // redirect to post show page
                    res.redirect(`/posts/${post._id}`);
                }
            });
        }
    });
});

module.exports = router;
