import * as dayjs from 'dayjs';

export class Blog {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  summary: string;
  lastModified: string;
  isDraft: boolean;
  deleted: boolean;
  tags: string[];

  constructor(blog: any) {
    this.id = blog.id;
    this.title = blog.title;
    this.content = blog.content;
    this.summary = blog.summary;
    this.createdDate = blog.createdDate;
    this.lastModified = blog.lastModified;
    this.isDraft = blog.isDraft === true ? true : false;
    this.deleted = blog.deleted;
    this.tags = !!blog.tags ? blog.tags : [];
  }

  get createdDateDisplay(): string {
    return dayjs(this.createdDate).format('MMM DD, YYYY');
  }

  get lastModifiedDisplay(): string {
    return dayjs(this.lastModified).format('MMM DD, YYYY');
  }
}
