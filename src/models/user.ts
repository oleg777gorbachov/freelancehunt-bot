import { Schema, model } from "mongoose";

const schema = new Schema({
  state: { type: Boolean, default: true },
  chatId: String,
  skills: { type: Array, default: [] },
  notified: Array,
  sleep: { type: String, default: "null" },
  utc: { type: Number, default: 3 },
});

export default model("chats", schema);
