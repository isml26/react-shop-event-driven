import { Schema, Model, model, Document } from "mongoose";
import { Password } from "../services/password";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  email: string;
  password: string;
  confirmed?: Boolean;
}

interface UserModel extends Model<IUser> {
  build(attrs: IUser): UserDoc;
}

interface UserDoc extends Document {
  email: string;
  password: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
  },
  {
    toJSON: {
      // doc is  The mongoose document which is being convertedret
      // ret is The plain object representation which has been converted
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// let involve typesciprt to
userSchema.static("build", function (attrs: IUser) {
  return new User(attrs);
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// 3. Create a Model.
const User = model<IUser, UserModel>("User", userSchema);

export { User };
