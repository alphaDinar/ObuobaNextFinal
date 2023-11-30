import { useRouter } from "next/router";
import TopNav from "../Components/TopNav/TopNav";
import Sidebar from "../Components/Sidebar/Sidebar";
import Panel from "../Components/Panel/Panel";
import { useLoader } from "../_app";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { fireStoreDB } from "../../Firebase/base";
import { getTimeSince, icon, iconFont } from "../../External/external";

const ViewPost = () => {
  const router = useRouter();
  const { id } = router.query;

  const [posts, setPosts] = useState([])
  const [post, setPost] = useState([]);
  const { setLoader } = useLoader();
  useEffect(() => {
    setLoader(true)
    getDoc(doc(fireStoreDB, 'Obuoba/' + 'con'))
      .then((res) => {
        setPost(res.data().posts.find((el) => el.pid === id))
        console.log(res.data().posts.find((el) => el.pid === id))
        setLoader(false)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <TopNav />
      <section className="page">
        <Sidebar props={{posts, setPosts}} />
        <section className="main">
          {post &&
            <section className='news' data-aos="fade-up">
              <p>
                <span style={{ fontSize: '0.9rem' }}></span>
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
                <p style={{ color: 'black', minHeight: 'auto' }}>{post.content}</p>
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
          }
        </section>
        <Panel />
      </section>
    </>
  );
}

export default ViewPost;