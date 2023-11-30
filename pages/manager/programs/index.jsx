import { useEffect, useState } from "react";
import styles from '../manager.module.css';
import ManagerSidebar from "../ManagerSidebar";
import { getTimeSince, icon, sortByTime } from "../../../External/external";
import { uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";
import { fireStoreDB, storageDB } from "../../../Firebase/base";
import { dayBoxes } from "../../../External/lists";
import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useLoader } from "../../_app";

const Programs = () => {
  const {setLoader} = useLoader();
  const [formToggled, setFormToggled] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState('');
  const [previewMedia, setPreviewMedia] = useState(null);
  const [host, setHost] = useState('');
  const [day, setDay] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [programs, setPrograms] = useState([]);
  const [programBank, setProgramBank] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [pid, setPid] = useState('');

  const resetState =()=>{
    setName('');
    setDescription('');
    setMedia('');
    setPreviewMedia('');
    setHost('');
    setDay('');
    setStart('');
    setEnd('');
    setUpdateMode(false);
    setPid('');
  }

  const toggleForm = () => {
    formToggled ? setFormToggled(false) : setFormToggled(true);
  }

  useEffect(() => {
    getDoc(doc(fireStoreDB, 'Obuoba/' + 'con'))
      .then((res) => {
        setPrograms(res.data().programs)
        setProgramBank(res.data().programs)
        setLoader(false)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleImage = (file) => {
    setPreviewMedia(URL.createObjectURL(file))
    setMedia(file)
  }

  const createProgram = () => {
    const mediaName = media.name + Date.now();
    setLoader(true)
    uploadBytes(storageRef(storageDB, 'Obuoba/' + mediaName), media)
      .then((res) => {
        getDownloadURL(res.ref)
          .then((media_url) => {
            const programObj = {
              pid: 'program' + Date.now(),
              name: name.toUpperCase(),
              host: host,
              description: description,
              media: media_url,
              day: day,
              start: start,
              end: end,
              timestamp: Date.now()
            }
            const updatedPrograms = [...programs, programObj]
            updateDoc(doc(fireStoreDB, 'Obuoba/' + 'con'), {
              programs: updatedPrograms
            })
              .then(() => { setPrograms(updatedPrograms); resetState(); toggleForm(); setLoader(false) })
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

  const deleteProgram = (pid) => {
    const option = window.confirm('Do you want to delete program');
    if (option) {
      setLoader(true)
      const updatedPrograms = programs.filter((el) => el.pid !== pid);
      updateDoc(doc(fireStoreDB, 'Obuoba/' + 'con'), {
        programs: updatedPrograms
      })
        .then(() => { setPrograms(updatedPrograms); setLoader(false) })
        .catch((error) => console.log(error))
    }
  }


  const updateForm = (elPid) => {
    setFormToggled(true)
    const item = programs.find((el) => el.pid === elPid);
    setName(item.name);
    setDescription(item.description);
    setPreviewMedia(item.media)
    setHost(item.host)
    setDay(item.day)
    setStart(item.start)
    setEnd(item.end)
    setPid(elPid)
    setUpdateMode(true)
  }

  const updateProgram = () => {
    const programObj = {
      pid: 'program' + Date.now(),
      name: name.toUpperCase(),
      host: host,
      description: description,
      day: day,
      start: start,
      end: end,
      timestamp: Date.now()
    }
    const filteredPrograms = programs.filter((el) => el.pid !== pid);
    setLoader(true)
    if (media) {
      const mediaName = media.name + Date.now();
      uploadBytes(storageRef(storageDB, 'Obuoba/' + mediaName), media)
        .then((res) => {
          getDownloadURL(res.ref)
            .then((media_url) => {
              programObj['media'] = media_url;
              const updatedPrograms = [...filteredPrograms, programObj]
              updateDoc(doc(fireStoreDB, 'Obuoba/' + 'con'), {
                programs: updatedPrograms
              })
                .then(() => { setPrograms(updatedPrograms); resetState(); toggleForm(); setLoader(false) })
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
      programObj['media'] = previewMedia;
      const updatedPrograms = [...filteredPrograms, programObj]
      updateDoc(doc(fireStoreDB, 'Obuoba/' + 'con'), {
        programs: updatedPrograms
      })
        .then(() => { setPrograms(updatedPrograms) ; resetState(); toggleForm(); setLoader(false) })
        .catch((error) => console.log(error))
    }
  }

  const filterDays =(val)=>{
    const programsTemp = [...programBank];
    if(val === 'all'){
      setPrograms(programsTemp)
    }else{
      setPrograms(programsTemp.filter((el)=> parseInt(el.day) === parseInt(val)))
    }
  }

  const searchProgram =(val)=>{
    const programsTemp = [...programBank];
    setPrograms(programsTemp.filter((el)=> el.name.toLowerCase().includes(val.toLowerCase())))
    // console.log(programsTemp[0].name.toLowerCase().includes(val))
    // console.log(programsTemp.filter((el)=> el.name.toLowerCase().includes(val)))
    
  }

  return (
    <section className={styles.page}>
      <ManagerSidebar />
      <section className={styles.main}>
        <header>
          <select onChange={(e)=>{filterDays(e.target.value)}}>
            <option value='all'>All</option>
            {dayBoxes.map((el,i)=>(
              <option value={el.code}>{el.name}</option>
            ))}
          </select>
          <strong>Programs</strong>
          <input type="text" placeholder="Search Program" onChange={(e)=>{searchProgram(e.target.value.toLowerCase())}} />
        </header>


        {dayBoxes.map((el, i) => (
          <section key={i} className={styles.day_box_holder}>
            <section className={styles.day_box}>
              <h3>{el.name}</h3>
              <section className={styles.list_box}>
                {
                  programs.filter((prog) => parseInt(prog.day) === el.code).map((child,ci) => (
                    <div key={ci} className={styles.program}>
                      <img src={child.media} />
                      <p>
                        <span>{icon('mic')} <small>{child.name}</small></span>
                        <span>{icon('person_pin_circle')} <small>{child.host}</small> </span>
                        <span>{icon('schedule')} <small>{child.start} - {child.end}</small></span>
                      </p>
                      <nav>
                        <i className="material-symbols-outlined" onClick={() => { updateForm(child.pid) }}>edit</i>
                        <i className="material-symbols-outlined" onClick={() => { deleteProgram(child.pid) }}>delete</i>
                      </nav>
                    </div>
                  ))
                }
                <div className={styles.add_program} onClick={() => { toggleForm(); setDay(el.code); setUpdateMode(false) }}>
                  {icon('add')}
                </div>
              </section>
            </section>
          </section>
        ))}

        <section className={formToggled ? `${styles.form_cover} ${styles.show}` : styles.form_cover}>
          <form onSubmit={(e) => { e.preventDefault(); !updateMode ? createProgram() : updateProgram() }}>
            <button type="button" onClick={()=>{toggleForm(); resetState()}}>{icon('close')}</button>
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
              <span>Host</span>
              <input type="text" value={host} onChange={(e) => { setHost(e.target.value) }} />
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

            <div>
              start - <input type="time" value={start} onChange={e => { setStart(e.target.value) }} required />
              end -<input type="time" value={end} onChange={e => { setEnd(e.target.value) }} required />
            </div>
            <button type="submit">Done</button>
          </form>
        </section>
      </section>
    </section>
  );
}

export default Programs;