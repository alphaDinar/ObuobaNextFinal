import { useEffect, useState } from 'react';
import { icon, iconFont, presenterImg } from '../../../External/external';
import styles from '../sides.module.css';
import { fireStoreDB } from '../../../Firebase/base';
import { doc, getDoc } from 'firebase/firestore';
import { usePlaying } from '../../_app';

const Panel = () => {
  const [currentProgram, setCurrentProgram] = useState('');
  const [nextProgram, setNextProgram] = useState('');

  const {playing, setPlaying} = usePlaying();
  const togglePlaying =()=>{
    playing ? setPlaying(false) : setPlaying(true); 
  }

  useEffect(() => {
    getDoc(doc(fireStoreDB, 'Obuoba/con'))
      .then((res) => {
        const day = new Date().getDay();
        const nextDay = new Date(new Date().setDate(new Date().getDate() + 1)).getDay();
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const sortByHour = (a, b) => {
          const hourA = a.start.split(',')[0];
          const hourB = b.start.split(',')[0];
          return hourA - hourB;
        }
        const dailyPrograms = (res.data().programs.filter((el) => parseInt(el.day) === day)).sort(sortByHour);
        dailyPrograms.map((el) => {
          const startHours = parseInt(el.start.split(':')[0]);
          const startMinutes = parseInt(el.start.split(':')[1]);
          const endHours = parseInt(el.end.split(':')[0]);
          const endMinutes = parseInt(el.end.split(':')[1]);

          if (
            (hours > startHours || (hours === startHours && minutes >= startMinutes)) &&
            (hours < endHours || (hours === endHours && minutes <= endMinutes))
          ) {
            sessionStorage.setItem('currentProgram', JSON.stringify(el))
            setCurrentProgram(el);
            const currentProgramIndex = dailyPrograms.indexOf(el);
            console.log(currentProgramIndex)
            if (dailyPrograms[currentProgramIndex + 1]) {
              setNextProgram(dailyPrograms[currentProgramIndex + 1]);
            } else {
              setNextProgram((res.data().programs.filter((el) => parseInt(el.day) === nextDay)).sort(sortByHour)[0])
            }
          } else {
            console.log('me')
          }
        })
      })
  }, [])


  return (
    <section className={styles.panel}>
      <section className={styles.players}>

        {currentProgram &&
          <section className={styles.player_box}>
            <div id="tag" className={styles.cur_tag} style={{ zIndex: 1000 }}>
              <span></span>
              <div className={styles.bars} style={{ position: 'revert' }}>
                <small></small>
                <small></small>
                <small></small>
                <small></small>
              </div>
            </div>
            <div className={styles.player_image}>
              <img src={currentProgram.media} />
              <p>{icon('person')} <span>{currentProgram.host}</span></p>
            </div>
            <nav>
              <p>{icon('radio')} <span>Program : {currentProgram.name}</span></p>

              <p>{icon('timer')}
                <span>
                  {currentProgram.start} - {currentProgram.end}
                </span>
              </p>
              <div className={styles.progress_box_holder}>
                <button onClick={togglePlaying}>{playing ? icon('power_settings_new') : icon('play_arrow')}</button>
                <div className={styles.progress_box}>
                  <div className={styles.line}></div>
                  <div className={styles.graph} style={{ position: 'revert' }}>
                  </div>
                </div>
              </div>
            </nav>
            <div className={styles.bars}>
              <small></small>
              <small></small>
              <small></small>
              <small></small>
            </div>
          </section>
        }
        {nextProgram &&
          <section className={styles.player_box}>
            <h4>Up Next</h4>
            <div className={styles.player_image}>
              <img src={nextProgram.media} />
              <p>{icon('person')}<span>{nextProgram.host}</span></p>
            </div>
            <nav>
              <p>{icon('radio')} <span>next_program </span></p>
              <p>{icon('timer')} <span>10:10 - 12:10</span></p>
            </nav>
          </section>
        }
      </section>

      <section className={styles.panelAdBox}>
        <img className={styles.panelAd} data-aos="fade-up"
          src="https://res.cloudinary.com/dvnemzw0z/image/upload/v1693298884/WhatsApp_Image_2023-08-28_at_16.29.48_cmmbpk.jpg" />
      </section>


      <section className={styles.panelAdBox}>
        <img className={styles.panelAd} data-aos="fade-up"
          src="https://res.cloudinary.com/dvnemzw0z/image/upload/v1693298884/WhatsApp_Image_2023-08-28_at_16.29.48_cmmbpk.jpg"
          alt="" />
      </section>
    </section>

  );
}

export default Panel;


// <section className={styles.topStoryBox}>
// <h3>Top Stories</h3>
// <section className={styles.topStories}>
//   <a href="{% url 'view_post_page' post.slug %}" data-tags="post.tags" className="topStory">
//     <span>NPP</span>
//     <p>
//       post.title
//     </p>
//   </a>
// </section>
// </section>