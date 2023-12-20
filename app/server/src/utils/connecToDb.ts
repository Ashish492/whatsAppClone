import mongoose from 'mongoose';
mongoose.set('runValidators', true);
export default async function connectToDB() {
  mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
      delete converted.__id;
      converted.id = doc._id;
    },
  });
  return await mongoose.connect(process.env.DATABASE_URL);
}
