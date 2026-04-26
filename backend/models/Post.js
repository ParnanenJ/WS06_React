const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    // TODO: Add title field with String type, required validation, trim, and minlength
    title: {
      type: String,
      require: true,
      trim: true,
      minlength: 3
    },
    // TODO: Add content field with String type, required validation, trim, and minlength
    content: {
      type: String,
      require: true,
      trim: true,
      minlength: 10,
    },
    // TODO: Add author field with String type, required validation, and trim
    author: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    // TODO: Enable timestamps to track creation and update times
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);