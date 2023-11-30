import Link from 'next/link';
import { icon, iconFont, presenterImg } from '../../../External/external';
import styles from '../sides.module.css';
import { categories } from '../../../External/lists';
import { useEffect, useState } from 'react';

const Sidebar = ({props}) => {
  
  const { posts, setPosts } = props;
  console.log(posts)
  const [postsBank, setPostsBank] = useState([]);
  const [currentProgram, setCurrentProgram] = useState({});

  useEffect(() => {
    setPostsBank(JSON.parse(sessionStorage.getItem('posts')));
    setCurrentProgram(JSON.parse(sessionStorage.getItem('currentProgram')));
  }, [])

  const filterPosts = (val) => {
    if (posts) {
      setPosts(postsBank.filter((el) => el.category === val))
    }
  }

  const [sidebarToggled, setSidebarToggled] = useState(false);

  const toggleSidebar =()=>{
    sidebarToggled ? setSidebarToggled(false) : setSidebarToggled(true);
  }

  return (
    <section className={sidebarToggled ? `${styles.sidebar} ${styles.change}` : styles.sidebar}>
    <button onClick={toggleSidebar}>{icon("menu")}</button>
      <header>
        <Link href={'/'}>
          <a>
            <img src="https://res.cloudinary.com/dvnemzw0z/image/upload/v1692289104/logo_2_nxwecd.png" />
          </a>
        </Link>
      </header>
      <nav>
        <a onClick={() => { setPosts(postsBank) }}> {icon('apps')}  <span>All</span></a>
        {categories.map((el, i) => (
          <a key={i} onClick={() => { filterPosts(el.name) }}>{icon(el.iconEl)}  <span>{el.label}</span></a>
        ))}
      </nav>
      <footer>
        <a href="">{iconFont('fa-brands fa-google', '#e94235')} <span>Google Podcast</span> </a>
        <a href="">{iconFont('fa-brands fa-itunes', '#924fea')} <span>iTunes</span> </a>
        <a href="">{iconFont('fa-brands fa-spotify', '#2dd96b')} <span>Spotify</span> </a>
      </footer>

      {currentProgram && 
        <section className={styles.presenterBox}>
          <div className={styles.imgBox} style={{ backgroundImage: `url(${currentProgram.media})` }}>
            <p><span>Presenter Profile</span></p>
            <p>{icon('person')} <span>{currentProgram.host}</span></p>
          </div>
          <article>
            {currentProgram.description}
          </article>
        </section>
      }

      <section className={styles.sideAdBox}>
        <img className={styles.sideAd} data-aos="fade-up"
          src="https://res.cloudinary.com/dvnemzw0z/image/upload/v1693298884/WhatsApp_Image_2023-08-28_at_16.29.48_cmmbpk.jpg"
          alt="" />
      </section>
    </section>
  );
}

export default Sidebar;