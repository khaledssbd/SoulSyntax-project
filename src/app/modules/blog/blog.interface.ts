import { Model, Types } from 'mongoose';

export interface TBlog {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished?: boolean;
}

export interface TBlogModel extends Model<TBlog> {
  isBlogExists(id: string): Promise<TBlog>;
}
