import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "../../lib/client";
import type { IPostPreview } from "../../types/post";

interface IFetchPosts {
    posts: IPostPreview[],
    total: number
}

export default async function posts(req: NextApiRequest, res: NextApiResponse) {

  const {start, end} = req.query
  // Проверка на число
  if(isNaN(Number(start)) || isNaN(Number(end))) {
    return res.status(400).end()
  }

  const {posts, total} = await fetchPosts(Number(start), Number(end))
  res.status(200).json({posts, total})

}

export async function fetchPosts(start: number, end: number): Promise<IFetchPosts> {
  const query = `{
        "posts": *[_type == 'post'] | order(publishedDate desc) [${start}...${end}] {_id, publishedDate, title, slug, description, image},
        "total": count(*[_type == 'post'])
    }`;
  const { posts, total } = await client.fetch(query);

  return { posts, total };
}
