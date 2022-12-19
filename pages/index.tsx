import Head from 'next/head'
import AppFooter from '../components/UI/AppFooter'
import HeroBlock from '../components/Hero-block/HeroBlock'
import SectionsTitle from '../components/UI/Sections/SectionsTitle'
import { fetchPosts } from './api/posts'
import { IPostPreview } from '../types/post'
import { useState } from 'react'
import PostsGrid from '../components/Posts/PostsGrid'
import PostPreview from '../components/Posts/PostPreview'

const LOAD_STEP = 4

interface HomeProps {
  initialPosts: IPostPreview[],
  total: number
}

const Home: React.FC<HomeProps> = ({ initialPosts, total }) => {

  const [posts, setPosts] = useState(initialPosts)
  const [loadedAmout, setLoadedAmount] = useState(LOAD_STEP)
  const [loading, setLoading] = useState(false)

  const isLoadingBtn = total > loadedAmout

  const getMorePosts = async () => {
    try {
      setLoading(true)
      const resp = await fetch(`/api/posts/?start=${loadedAmout}&end=${loadedAmout + LOAD_STEP}`)
      const data = await resp.json()
      
      console.log('Data', data)

      setLoadedAmount(loadedAmout + LOAD_STEP)
      setPosts([...posts, ...data.posts])

    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='wrapper'>
      <Head>
        <title>My super blog</title>
        <meta property="og:title" content="My super blog" key="title" />
      </Head>
      <main>
        <HeroBlock />
        <div className='container'>
          <SectionsTitle title='Latest posts' />
          {/* posts */}
          <PostsGrid>
            {posts.map(item => <PostPreview key={item._id} post={item} />)}
          </PostsGrid>
          {/* load more button */}
          {isLoadingBtn && (
            <div className='pt-5 pb-3 text-center'>
              <button onClick={getMorePosts} disabled={loading} className='btn btn-primary btn-lg'>Load more posts{loading && '...'}</button>
            </div>
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  )
}

export default Home;

export async function getServerSideProps() {
  const { posts, total } = await fetchPosts(0, LOAD_STEP)

  return {
    props: {
      initialPosts: posts,
      total
    },
  }
}


