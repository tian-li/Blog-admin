import * as dayjs from 'dayjs';

export class Blog {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  summary: string;
  tags: string[];
  lastModified: string;

  constructor(blog: any) {
    this.id = blog.id;
    this.title = blog.title;
    this.content = blog.content;
    this.summary = blog.summary;
    this.createdDate = dayjs(blog.createdDate).format('MMM DD, YYYY');
    this.lastModified = dayjs(blog.lastModified).format('MMM DD, YYYY');
    this.tags = blog.tags;
  }
}
