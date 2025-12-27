import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: function () {
        return this.oAuthProvider === "local";
      },
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "vendor", "user"],
      default: "user",
    },

    oAuthProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
