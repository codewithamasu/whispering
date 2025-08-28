import mongoose, { Document, Model } from "mongoose";

mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

interface IWhisper extends Document {
  message: string;
  _id: string;
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const whisperSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  }
});

const Whisper: Model<IWhisper> = mongoose.model<IWhisper>('Whisper', whisperSchema);

export { Whisper };
export type { IWhisper };
