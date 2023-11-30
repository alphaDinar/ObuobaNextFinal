import Link from "next/link";
import { getTimeSince, icon, iconFont } from "../../External/external";

const NewsBox = (props) => {
  const { posts } = props;
  return (
    <section className='news_box'>
      {posts != undefined && posts.map((post, i) => (
        <Link key={i} href={`post/${post.pid}`}>
          <section className='news' data-aos="fade-up">
            <p>
              <span style={{ fontSize: '0.9rem' }}>{getTimeSince(post.timestamp)}</span>
              <span>
                {icon('steppers')}{post.category}
              </span>
            </p>
            <h3>
              {post.title}
            </h3>
            <div className='tag_box' data-tags="post.tags">
            </div>
            <div className='img_box'>
              {post.type === 'image' ?
                <img src={post.media} /> :
                <video src={post.media} muted controls></video>
              }
              <small style={{ color: 'rgb(107, 107, 107)' }}>Source : {post.source}</small>
              <p className="newsContent" style={{ color: 'black' }}>{post.content}</p>
              <nav>
                <a>
                  {iconFont('fa-brands fa-facebook-f', '#4867aa')}
                </a>
                <a>
                  {iconFont('fa-brands fa-whatsapp', '#39d855')}
                </a>
                <a>
                  {iconFont('fa-brands fa-twitter', '#1da1f2')}
                </a>
                <a>
                  {iconFont('fa-brands fa-google', '#e94235')}
                </a>
                <a>
                  {iconFont('fa-brands fa-linkedin', '#0077b5')}
                </a>
              </nav>
            </div>
          </section>
        </Link>
      ))}
    </section>
  );
}

export default NewsBox;