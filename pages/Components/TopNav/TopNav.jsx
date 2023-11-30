import { doc, getDoc } from 'firebase/firestore';
import { icon, iconFont, presenterImg, sortByTime } from '../../../External/external';
import { fireStoreDB } from '../../../Firebase/base';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePlaying } from '../../_app';

const TopNav = () => {
  const [currentProgram, setCurrentProgram] = useState('');
  const [nextProgram, setNextProgram] = useState('');

  const { playing, setPlaying } = usePlaying();
  const togglePlaying = () => {
    if(playing){
      pauseAudio();
      setPlaying(false);
    }else{
      playAudio();
      setPlaying(true);
    }
  }

  useEffect(() => {
    getDoc(doc(fireStoreDB, 'Obuoba/con'))
      .then((res) => {
        const day = new Date().getDay();
        const nextDay = new Date(new Date().setDate(new Date().getDate() + 1)).getDay();
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const sortByHour = (a, b) => {
          const hourA = a.start.split(',')[0]
          const hourB = b.start.split(',')[0]
          return hourA - hourB;
        }
        const dailyPrograms = (res.data().programs.filter((el) => parseInt(el.day) === day)).sort(sortByHour)

        dailyPrograms.map((el) => {
          const startHours = parseInt(el.start.split(':')[0]);
          const startMinutes = parseInt(el.start.split(':')[1]);
          const endHours = parseInt(el.end.split(':')[0]);
          const endMinutes = parseInt(el.end.split(':')[1]);

          if (
            (hours > startHours || (hours === startHours && minutes >= startMinutes)) &&
            (hours < endHours || (hours === endHours && minutes <= endMinutes))
          ) {
            setCurrentProgram(el);
          } else {
            console.log('me')
          }
          const currentProgramIndex = dailyPrograms.indexOf(el);

          if (dailyPrograms[currentProgramIndex + 1]) {
            setNextProgram(dailyPrograms[currentProgramIndex + 1]);
          } else {
            setNextProgram((res.data().programs.filter((el) => parseInt(el.day) === nextDay)).sort(sortByHour)[0])
          }
        })
      })
  }, [])


  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setAudioIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioIsPlaying(false);
    }
  };

  return (
    <section className="top_nav">
      <div className="player">
        <p>
          <span> {currentProgram.name} </span>
          <small> {currentProgram.start} -  {currentProgram.end}</small>
        </p>
        <button onClick={togglePlaying}>{playing ? icon('power_settings_new') : icon('play_arrow')}</button>
        <audio autoPlay={false} style={{ display: 'none' }} ref={audioRef} id="radio_track">
          <source src="http://stream.zeno.fm/hkqtocoadweuv" type="audio/mpeg" />
        </audio>
      </div>
      <section className="left_box">
        <div className="left">
          <small>Follow Us On</small>
          <hr style={{ width: '80px', borderTop: '2px solid darkgray' }} />
          <div>
            <a href="">{iconFont('fa-brands fa-instagram', 'white')}</a>
            <a href="">{iconFont('fa-brands fa-facebook', 'white')}</a>
            <a href="">{iconFont('fa-brands fa-twitter', 'white')}</a>
            <a href="">{iconFont('fa-brands fa-tiktok', 'white')}</a>
          </div>
        </div>

        <div>
          <Link href={'/about'}>
            <a> {icon('not_listed_location')} <span>About us</span></a>
          </Link>
          <Link href={'/contact'}>
            <a href=""> {icon('contacts')}<span>Contact us</span></a>
          </Link>
          <Link href={'/terms'}>
            <a href=""> {icon('assignment')} <span>Terms and Policies</span></a>
          </Link>
        </div>

      </section>


    </section>
  );
}

export default TopNav;

// <div className="right">
// <input type="text" placeholder="Search" />
// {icon('search')}
// </div>