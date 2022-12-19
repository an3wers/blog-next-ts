export interface IPostPreview {
  _id: string;
  description: string;
  image: {
    _type: string;
    asset: any;
  };
  publishedDate: string;
  slug: {
    _type: string;
    current: string;
  };
  title: string;
}

export interface IPost {
  _id: string,
  title: string,
  publishedDate: string,
  body: any,
  image: any,
  'meta_title': string,
  slug: string,
}