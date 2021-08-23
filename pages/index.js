import Layout from '../component/Layout';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import moment from 'moment';

export default function Home({ posts }) {
  return (
    <Layout>
      {/* Banner */}
      <section id='banner' className='major'>
        <div className='inner'>
          <header className='major'>
            <h1>Hi, my name is Forty</h1>
          </header>
          <div className='content'>
            <p>
              A responsive site template designed by HTML5 UP
              <br />
              and released under the Creative Commons.
            </p>
            <ul className='actions'>
              <li>
                <a href='#one' className='button next scrolly'>
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Main */}
      <div id='main'>
        {/* One */}
        <section id='one' className='tiles'>
          {/* Loop over Post */}
          {posts.map((post) => (
            <article>
              <span className='image'>
                <img src={`/assets/images/${post.featured_image}`} alt='' />
              </span>
              <header className='major'>
                <h3>
                  <Link href={`/${post.slug}`} className='link'>
                    {post.title}
                  </Link>
                </h3>
                {/* <p>{post.content}</p> */}
              </header>
            </article>
          ))}
          <article>
            <span className='image'>
              <img src='/assets/images/pic03.jpg' alt='picture' />
            </span>
            <header className='major'>
              <h3>
                <a href='landing.html' className='link'>
                  Magna
                </a>
              </h3>
              <p>Lorem etiam nullam</p>
            </header>
          </article>
          <article>
            <span className='image'>
              <img src='/assets/images/pic04.jpg' alt='picture' />
            </span>
            <header className='major'>
              <h3>
                <a href='landing.html' className='link'>
                  Ipsum
                </a>
              </h3>
              <p>Nisl sed aliquam</p>
            </header>
          </article>
        </section>
        {/* Two */}
        <section id='two'>
          <div className='inner'>
            <header className='major'>
              <h2>Massa libero</h2>
            </header>
            <p>
              Nullam et orci eu lorem consequat tincidunt vivamus et sagittis
              libero. Mauris aliquet magna magna sed nunc rhoncus pharetra.
              Pellentesque condimentum sem. In efficitur ligula tate urna.
              Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor.
              Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis
              libero. Mauris aliquet magna magna sed nunc rhoncus amet pharetra
              et feugiat tempus.
            </p>
            <ul className='actions'>
              <li>
                <a href='landing.html' className='button next'>
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const sortPosts = () => {
    const allPost = fs.readdirSync('posts').map((filename) => {
      const file = fs.readFileSync(path.join('posts', filename)).toString();
      // console.log(post);
      const postData = matter(file);
      // const content = marked(postData.content);
      // console.log(content);
      return {
        content: postData.content,
        title: postData.data.title,
        featured_image: postData.data.featured_image,
        date: postData.data.date,
        slug: postData.data.slug,
      };
    });

    return allPost.sort(
      (a, b) =>
        new moment(b.date, 'YYYY-MM-DD HH:mm:ss') -
        new moment(a.date, 'YYYY-MM-DD HH:mm:ss')
    );
  };

  return {
    props: {
      posts: sortPosts(),
    },
  };
};
