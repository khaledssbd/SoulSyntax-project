import { Schema, model } from 'mongoose';
import { TBlog, TBlogModel } from './blog.interface';

// Schema
const blogSchema = new Schema<TBlog, TBlogModel>(
  {
    title: {
      type: String,
      // required: [true, 'Blog title is required!'], // required
      // unique: true,
      // trim: true,
    },
    content: {
      type: String,
      // required: [true, 'Blog content is required'], // required
      // trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      // required: [true, 'Blog author id is required'], // required
      ref: 'User', // model name
    },
    // isPublished: {
    //   type: Boolean,
    //   default: true, // default
    // },
  },
  {
    versionKey: false,
  },
);

blogSchema.pre('find', function (next) {
  // while using find method we want to show the data that has isPublished: true
  this.find({ isPublished: { $ne: false } });
  next();
});

//
blogSchema.pre('findOne', function (next) {
  // while using findOne method we want to show the data that has isPublished: true
  this.find({ isPublished: { $ne: false } });
  next();
});

blogSchema.pre('aggregate', function (next) {
  // while using aggregate(find) method we want to show the data that has isPublished: true
  this.pipeline().unshift({ $match: { isPublished: { $ne: false } } });
  next();
});

// Creating a custom static method
blogSchema.statics.isBlogExists = async function (id: string) {
  const existingBlog = await Blog.findById(id);
  return existingBlog;
};

// Creating model
export const Blog = model<TBlog, TBlogModel>('Blog', blogSchema);
