import { useEffect, useState } from "react";
import styles from '../manager.module.css';
import ManagerSidebar from "../ManagerSidebar";
import { getTimeSince, icon, sortByTime } from "../../../External/external";
import { uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";
import { fireStoreDB, storageDB } from "../../../Firebase/base";
import { dayBoxes } from "../../../External/lists";
import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useLoader } from "../../_app";

const Team = () => {
  const { setLoader } = useLoader();
  const [formToggled, setFormToggled] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState('');
  const [teams, setTeams] = useState([]);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [tid, setTid] = useState('');

  useEffect(() => {
    getDoc(doc(fireStoreDB, 'Obuoba/' + 'con'))
      .then((res) => {
        setTeams(res.data().teams)
        setLoader(false)
      })
      .catch((error) => console.log(error))
  }, [])

  const resetState = () => {
    setName('');
    setDescription('');
    setMedia('');
    setPreviewMedia('');
    setUpdateMode(false);
    setTid('');
  }

  const handleImage = (file) => {
    setPreviewMedia(URL.createObjectURL(file))
    setMedia(file)
  }

  const createTeam = () => {
    const mediaName = media.name + Date.now();
    setLoader(true)
    uploadBytes(storageRef(storageDB, 'Obuoba/' + mediaName), media)
      .then((res) => {
        getDownloadURL(res.ref)
          .then((media_url) => {
            const teamObj = {
              tid: 'team' + Date.now(),
              name: name.toUpperCase(),
              description: description,
              media: media_url,
              timestamp: Date.now()
            }
            const updatedTeams = [...teams, teamObj]
            updateDoc(doc(fireStoreDB, 'Obuoba/' + 'con'), {
              teams: updatedTeams
            })
              .then(() => { setTeams(updatedTeams); resetState(); toggleForm(); setLoader(false) })
              .catch((error) => console.log(error))
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const toggleForm = () => {
    formToggled ? setFormToggled(false) : setFormToggled(true);
  }

  const deleteTeam = (tid) => {
    const option = window.confirm('Do you want to delete Team');
    if (option) {
      setLoader(true)
      const updatedTeams = teams.filter((el) => el.tid !== tid);
      updateDoc(doc(fireStoreDB, 'Obuoba/' + 'con'), {
        teams: updatedTeams
      })
        .then(() => { setTeams(updatedTeams); setLoader(false) })
        .catch((error) => console.log(error))
    }
  }

  const updateForm = (elTid) => {
    setFormToggled(true)
    const item = teams.find((el) => el.tid === elTid);
    teams.map((el) => {
      console.log(el)
    })

    setName(item.name);
    setDescription(item.description);
    setPreviewMedia(item.media)
    setTid(elTid)
    setUpdateMode(true)
  }

  const updateTeam = () => {
    const teamObj = {
      tid: 'team' + Date.now(),
      name: name.toUpperCase(),
      description: description,
      timestamp: Date.now()
    }
    const filteredTeams = teams.filter((el) => el.tid !== tid);
    setLoader(true)
    if (media) {
      const mediaName = media.name + Date.now();
      uploadBytes(storageRef(storageDB, 'Obuoba/' + mediaName), media)
        .then((res) => {
          getDownloadURL(res.ref)
            .then((media_url) => {
              teamObj['media'] = media_url;
              const updatedTeams = [...filteredTeams, teamObj]
              updateDoc(doc(fireStoreDB, 'Obuoba/' + 'con'), {
                teams: updatedTeams
              })
                .then(() => { setTeams(updatedTeams); resetState(); toggleForm(); setLoader(false) })
                .catch((error) => console.log(error))
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      teamObj['media'] = previewMedia;
      const updatedTeams = [...filteredTeams, teamObj]
      updateDoc(doc(fireStoreDB, 'Obuoba/' + 'con'), {
        teams: updatedTeams
      })
        .then(() => { setTeams(updatedTeams); resetState(); toggleForm(); setLoader(false) })
        .catch((error) => console.log(error))
    }
  }


  return (
    <section className={styles.page}>
      <ManagerSidebar />
      <section className={styles.main}>
        <header>
          <strong>Team</strong>
        </header>


        <section className={styles.listBox} style={{display:'flex', flexWrap : 'wrap', gap:'2rem', justifyContent:'space-around'}}>
          {teams.map((el, i) => (
            <div className={styles.program} key={i}>
              <img src={el.media} />
              <p style={{ minHeight: '50px' }}>
                <span>{icon('mic')} <small>{el.name}</small></span>
              </p>
              <nav>
                <i className="material-symbols-outlined" onClick={() => { updateForm(el.tid) }}>edit</i>
                <i className="material-symbols-outlined" onClick={() => { deleteTeam(el.tid) }}>delete</i>
              </nav>
            </div>
          ))}

          <div className={styles.add_program} onClick={() => { toggleForm(); setUpdateMode(false) }}>
            {icon('add')}
          </div>
        </section>

        <section className={formToggled ? `${styles.form_cover} ${styles.show}` : styles.form_cover}>
          <form onSubmit={(e) => { e.preventDefault(); !updateMode ? createTeam() : updateTeam() }}>
            <button type="button" onClick={() => { toggleForm(); resetState() }}>{icon('close')}</button>
            <strong></strong>
            <div>
              <span>Name *</span>
              <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} required />
            </div>
            <div>
              <span>Description *</span>
              <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} required></textarea>
            </div>
            <div>
              <span>Image</span>
              <div className="img_box">
                <label htmlFor="add_image">
                  <i className="material-symbols-outlined">add_a_photo</i>
                  <input type="file" id="add_image" accept="image/*" onChange={e => { handleImage(e.target.files[0]) }} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
            <section className={styles.img_box}>
              <img src={previewMedia} />
            </section>
            <button type="submit">Done</button>
          </form>
        </section>
      </section>
    </section>
  );
}

export default Team;