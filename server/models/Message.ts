const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    },
  },
  {
    timestamps: true,
  },
);

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;
