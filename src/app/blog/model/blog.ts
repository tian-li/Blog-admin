import * as dayjs from 'dayjs';

export class Blog {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  summary: string;
  tags: string[];
  lastModified: string;
  isDraft: boolean;

  constructor(blog: any) {
    this.id = blog.id;
    this.title = blog.title;
    this.content = blog.content;
    this.summary = blog.summary;
    this.createdDate = dayjs(blog.createdDate).format('MMM DD, YYYY');
    this.lastModified = dayjs(blog.lastModified).format('MMM DD, YYYY');
    if (!!blog.tags) {
      this.tags = blog.tags;
    } else {
      this.tags = [];
    }
    this.isDraft = blog.isDraft === true ? true : false;
  }
}
