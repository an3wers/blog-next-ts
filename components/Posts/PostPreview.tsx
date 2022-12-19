import Link from "next/link"
import { IPostPreview } from "../../types/post"
import Image from 'next/image'
import { urlFor } from '../../lib/client'

interface PostPreviewProps {
  post: IPostPreview
}

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <div className="image-prev__container">
          <Image src={urlFor(post.image).url()} alt={post.title} className='card-img-top' fill />
        </div>
        <div className="card-body">
          <Link href={`/post/${encodeURIComponent(post.slug.current)}`}>
            <h5 className="card-title">{post.title}</h5>
          </Link>
          <p className="card-text">{post.description}</p>
          <p className="card-text"><small className="text-muted">{post.publishedDate}</small></p>

        </div>
      </div>
    </div>

  )
}

export default PostPreview