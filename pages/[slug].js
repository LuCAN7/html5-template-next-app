import Head from 'next/head';
import Layout from '../component/Layout';
import fs from 'fs';
import path from 'path';
import marked from 'marked';
import matter from 'gray-matter';

export default function PostPage({ postData, content }) {
  return (
    <Layout>
      <Head>
        <title>My Next Blog</title>
      </Head>
      <div id='main' className='alter'>
        <section id='one'>
          <div className='inner'>
            <header className='major'>
              <h1>{postData.title}</h1>
            </header>
            <span className='image main'>
              <img
                src={`/assets/images/${postData.featured_image}`}
                alt='banner image'
              />
            </span>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync('posts');
  console.log('FILES: ', files);
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const post = fs.readFileSync(path.join('posts', `${slug}.md`)).toString();
  console.log(post);
  const postData = matter(post);
  const content = marked(postData.content);

  // console.log(content);
  return {
    props: {
      slug,
      content,
      postData: postData.data,
    },
  };
};
