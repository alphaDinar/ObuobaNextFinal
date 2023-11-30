import Sidebar from './Components/Sidebar/Sidebar';
import Panel from './Components/Panel/Panel';
import styles from '../styles/home.module.css';
import { icon, iconFont, presenterImg, sortByTime } from '../External/external';
import TopNav from './Components/TopNav/TopNav';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { fireStoreDB } from '../Firebase/base';
import NewsBox from './Components/NewsBox';
import { useLoader, usePlaying } from './_app';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { setLoader } = useLoader(true);
  const [slideCount, setSlideCount] = useState(3);
  const [currentProgram, setCurrentProgram] = useState({});

  const { playing, setPlaying } = usePlaying();
  const togglePlaying = () => {
    playing ? setPlaying(false) : setPlaying(true);
  }

  useEffect(() => {
    window.innerWidth < 600 ? setSlideCount(2) : setSlideCount(3);
    setLoader(true)
    getDoc(doc(fireStoreDB, 'Obuoba/' + 'con'))
      .then((res) => {
        sessionStorage.setItem('posts', JSON.stringify(res.data().posts.sort(sortByTime)))
        setPosts(res.data().posts.sort(sortByTime))
        setLoader(false)
        setCurrentProgram(JSON.parse(sessionStorage.getItem('currentProgram')))
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <TopNav />
      <section className='page'>
        <Sidebar props={{posts, setPosts}} />
        <section className='main'>
          <section className={styles.main_player}>
            {currentProgram &&
              <div className={styles.card}>
                <section className={styles.player_image}>
                  <img src={currentProgram.media} />
                  <p>{icon('person')} <span>{currentProgram.host}</span></p>
                </section>
                <section className={styles.low}>
                  <span>{icon('radio')}<small>Program : {currentProgram.name}</small> </span>
                  <span>{icon('schedule')} <small>{currentProgram.start} - {currentProgram.end}</small></span>
                  <div className={styles.progress_box_holder}>
                    <button onClick={togglePlaying}>{playing ? icon('power_settings_new') : icon('play_arrow')}</button>
                    <div className={styles.progress_box}>
                      <div className={styles.line}></div>
                      <div className={styles.graph} style={{ position: 'revert' }}>
                      </div>
                    </div>
                  </div>
                </section>
                <div className={styles.bars}>
                  <small></small>
                  <small></small>
                  <small></small>
                  <small></small>
                </div>
              </div>
            }
          </section>

          <div className={styles.divider}>
            <span>News Updates</span>
            <hr style={{ width: '100%', borderTop: '2px solid darkgray' }} />
          </div>

          <section className={styles.top_swiper}>
            <Swiper slidesPerView={slideCount} spaceBetween={30} >
              {[...posts].slice(0,5).reverse().map((el, i) => (
                el.type === 'image' &&
                <SwiperSlide key={i}>
                  <Link href={`post/${el.pid}`}>
                    <div className={styles.postSlide} style={{ backgroundImage: `url(${el.media})` }}>
                      <a>
                        <p>{el.title.substring(0, 50)}...</p>
                      </a>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="material-symbols-outlined top_swiper_prev">chevron_left</button>
            <button className="material-symbols-outlined top_swiper_next">chevron_right</button>
          </section>

          <NewsBox posts={posts} />
        </section>
        <Panel />
      </section>
    </>
  )
}
