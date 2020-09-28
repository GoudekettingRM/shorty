const Mongoose = require('mongoose');

const LinkSchema = new Mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, 'An orignal URL is required to generate a shortned URL.'],
    trim: true,
  },
  urlIdentifier: {
    type: String,
    required: [
      true,
      'Without a unique identifier, we cannot retrieve the original URL.',
    ],
    maxlength: 6,
    unique: [true, 'This url identifier already exists in the database.'],
    lowercase: true,
  },
});

module.exports = Mongoose.models.Link || Mongoose.model('Link', LinkSchema);
