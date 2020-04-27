const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const ChatModel = mongoose.model('Chat', ChatSchema);

export default ChatModel;
