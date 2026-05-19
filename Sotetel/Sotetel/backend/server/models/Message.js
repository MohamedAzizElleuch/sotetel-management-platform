const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  subject: { type: String },
  message: { type: String, required: true },
  replies: [
    {
      text: { type: String },
      date: { type: Date, default: Date.now },
    }
  ],
  createdAt: { type: Date, default: Date.now },
});


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
