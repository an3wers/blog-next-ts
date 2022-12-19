import type { IPost } from '../../types/post'
import { client } from '../../lib/client'
import { GetStaticPropsContext } from 'next'
import { format } from 'date-fns'
import { ImArrowLeft2 } from "react-icons/im";
import { useRouter } from 'next/router';
import BlockContent from '@sanity/block-content-to-react'
import { clientConfig } from '../../lib/client'
import Head from 'next/head'

interface PostProps {
    post: IPost
}

const PostPage: React.FC<PostProps> = ({ post }) => {

    const formatedPublishDate = format(new Date(post.publishedDate), 'dd MMM yyyy')
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    const serializers = {
        types: {
            code: (props: any) => (
                <pre data-language={props.node.language}>
                    <code>{props.node.code}</code>
                </pre>
            ),
        },
    }

    return (
        <article>
            <Head>
                <title>{post.meta_title} - My super blog</title>
                <meta property="og:title" content={post.meta_title + ' - My super blog'} key="title" />
            </Head>
            <div className="container my-5">
                <div className='mb-4'>
                    <button onClick={handleBack} className='btn btn-light d-inline-flex align-items-center'>
                        <ImArrowLeft2 />
                        <span className='ms-2'>Back</span>
                    </button>
                </div>
                <h1 className="mb-4">{post.title}</h1>
                <p>{formatedPublishDate}</p>
                <BlockContent blocks={post.body} serializers={serializers} projectId={clientConfig.projectId} dataset={clientConfig.dataset} imageOptions={{ w: 1000, h: 750, fit: 'max' }} />
            </div>
        </article>
    )
}

export default PostPage

export async function getStaticPaths() {

    const query = `*[type == 'post'] {
        slug {
            current
        }
    }`

    const posts: any[] = await client.fetch(query)
    const paths = posts.map(post => {
        return { params: { slug: post.slug.current } }
    })

    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const { params } = context

    const query = `*[_type == 'post' && slug.current == '${params?.slug}'][0]`
    const post = await client.fetch(query)

    return {
        props: { post },
    }
}