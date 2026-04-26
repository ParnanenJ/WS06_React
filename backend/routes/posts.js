const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/Post');

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post('/', async (req, res) => {
  try {
    const post = new Post(req.body);
    const saved = await post.save();
    return res.status(201).json(saved);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.json(post);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  // TODO (student): Implement UPDATE operation for one post.
  // Suggested steps:

  // 1) Keep ObjectId validation for req.params.id.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }

  try {
  // 2) Update the post with req.body using Post.findByIdAndUpdate().
  // 3) Use { new: true, runValidators: true } so validation runs and the updated doc is returned.
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // 4) Return 404 if no post exists with this id.
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Palauta päivitetty postaus
    res.json(updatedPost);

    // 5) Return 400 for validation errors and 500 for other server errors.
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  // TODO (student): Implement DELETE operation for one post.
  // Suggested steps:

  // 1) Keep ObjectId validation for req.params.id.
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }

  try {
    // 2) Delete the post using Post.findByIdAndDelete().
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    // 3) Return 404 if no post exists with this id.
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // 4) Return a success JSON message when deletion succeeds.
    res.json({ message: 'Post deleted successfully' });

    // 5) Return 500 for unexpected server errors.
    } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;