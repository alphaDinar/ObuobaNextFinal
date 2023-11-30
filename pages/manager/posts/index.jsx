import { useEffect, useState } from "react";
import styles from '../manager.module.css';
import ManagerSidebar from "../ManagerSidebar";
import { getTimeSince, icon, sortByTime } from  '../../../External/external';
import { categories } from "../../../External/lists";
import { uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";
import { fireStoreDB, storageDB } from "../../../Firebase/base";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useLoader } from "../../_app";

const Posts = () => {
  const { setLoader } = useLoader();
  const [formToggled, setFormToggled] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState('');
  const [previewMedia, setPreviewMedia] = useState(null);
  const [type, setType] = useState('image');
  const [source, setSource] = useState('');
  const [tags, setTags] = useState('');
  const [posts, setPosts] = useState([]);
  const [postBank, setPostBank] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [pid, setPid] = useState('');

  const resetState = () => {
    setTitle('');
    setContent('');
    setMedia('');
    setPreviewMedia('');
    setType('');
    setSource('');
    setTags('');
    setCategory('');
    setUpdateMode(false);
    setPid('');
  }

  const toggleForm = () => {
    formToggled ? setFormToggled(false) : setFormToggled(true);
  }

  useEffect(() => {
    const getPosts = async () => {
      await getDoc(doc(fireStoreDB, 'Obuoba/' + 'con'))
        .then((res) => {
          setPosts(res.data().posts)
          setPostBank(res.data().posts)
          setLoader(false)
        })
    }
    getPosts()
  }, [])

  const handleMedia = (file) => {
    setMedia(file);
    setPreviewMedia(URL.createObjectURL(file))
    setType(file.type.split('/')[0]);
  }

  const createPost = () => {
    setLoader(true)
    const mediaName = media.name + Date.now();
    uploadBytes(storageRef(storageDB, 'Obuoba/' + mediaName), media)
      .then((res) => {
        getDownloadURL(res.ref)
          .then((media_url) => {
            const postObj = {
              pid: 'post' + Date.now(),
              title: title,
              category: category,
              content: content,
              media: media_url,
              type: type,
              timestamp: Date.now()
            }
            if (source) {
              postObj['source'] = source;
            }
            if (tags) {
              postObj['tags'] = tags;
            }

            const updatedPosts = [...posts, postObj]
            setPosts(updatedPosts)
            updateDoc(doc(fireStoreDB, 'Obuoba/' + 'con'), {
              posts: updatedPosts
            })
              .then(() => { resetState(); toggleForm(); setLoader(false) })
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


  const deletePost = (pid) => {
    const option = window.confirm('Do you want to delete post');
    if (option) {
      setLoader(true)
      const updatedPosts = posts.filter((el) => el.pid !== pid);
      updateDoc(doc(fireStoreDB, 'Obuoba/' + 'con'), {
        posts: updatedPosts
      })
        .then(() => { setPosts(updatedPosts); setLoader(false) })
        .catch((error) => console.log(error))
    }
  }

  const updateForm = (elPid) => {
    setFormToggled(true)
    const item = posts.find((el) => el.pid === elPid);
    setTitle(item.title);
    setCategory(item.category)
    setContent(item.content);
    setPreviewMedia(item.media)
    setType(item.type)
    setSource(item.source)
    setTags(item.tags)
    setPid(elPid)
    setUpdateMode(true)
  }


  const updatePost = () => {
    console.log('up')
    const postObj = {
      pid: 'post' + Date.now(),
      title: title,
      category: category,
      content: content,
      source : source,
      tags : tags,
      timestamp: Date.now()
    }
    const filteredPosts = posts.filter((el) => el.pid !== pid);
    setLoader(true)
    if (media) {
      const mediaName = media.name + Date.now();
      uploadBytes(storageRef(storageDB, 'Obuoba/' + mediaName), media)
        .then((res) => {
          getDownloadURL(res.ref)
            .then((media_url) => {
              postObj['media'] = media_url;
              postObj['type'] = media.type.split('/')[0]
              const updatedPosts = [...filteredPosts, postObj]
              updateDoc(doc(fireStoreDB, 'Obuoba/' + 'con'), {
                posts: updatedPosts
              })
                .then(() => { setPosts(updatedPosts); resetState(); toggleForm(); setLoader(false) })
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
      postObj['media'] = previewMedia;
      postObj['type'] = type;
      const updatedPosts = [...filteredPosts, postObj]
      updateDoc(doc(fireStoreDB, 'Obuoba/' + 'con'), {
        posts: updatedPosts
      })
        .then(() => { setPosts(updatedPosts); resetState(); toggleForm(); setLoader(false) })
        .catch((error) => console.log(error))
    }
  }

  const filterPosts = (val)=>{
    const postsTemp = [...postBank];
    setPosts(postsTemp.filter((el)=> el.category === val))
  }

  const searchPost =(val)=>{
    const postsTemp = [...postBank];
    setPosts(postsTemp.filter((el)=> el.title.toLowerCase().includes(val.toLowerCase())))
  }

  return (
    <section className={styles.page}>
      <ManagerSidebar />
      <section className={styles.main}>
        <header>
          <select onChange={(e)=>{filterPosts(e.target.value)}}>
            <option value="all">All</option>
            {categories.map((el,i)=>(
              <option value={el.name}>{el.name}</option>
            ))}
          </select>
          <strong>Posts</strong>
          <input type="text" placeholder="Search Post" onChange={(e)=>{searchPost(e.target.value)}} />
        </header>

        <section className={styles.list_box}>
          <div className={styles.add_post} onClick={()=>{toggleForm(); resetState()}}>
            {icon('add')}
          </div>

          {posts.sort(sortByTime).map((el, i) => (
            <div className={styles.post} key={i}>
              <small>{el.category}</small>
              {el.type === 'image' ?
                <img src={el.media} /> :
                <video src={el.media} controls></video>
              }
              <small>{getTimeSince(el.timestamp)}</small>
              <p> {el.title} </p>
              <nav>
                <i className="material-symbols-outlined" onClick={() => { updateForm(el.pid) }}>edit</i>
                <i className="material-symbols-outlined" onClick={() => { deletePost(el.pid) }}>delete</i>
              </nav>
            </div>
          ))}
        </section>

        <section className={formToggled ? `${styles.form_cover} ${styles.show}` : styles.form_cover}>
          <form onSubmit={(e) => { e.preventDefault(); !updateMode ? createPost() : updatePost() }}>
            <button type="button" onClick={()=>{toggleForm(); resetState()}}>
              {icon('close')}
            </button>
            <div>
              <span>Title *</span>
              <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} required />
            </div>
            <div>
              <span>Category</span>
              <select onChange={(e) => { setCategory(e.target.value) }} required>
                <option hidden>Select Category</option>
                {categories.map((el, i) => (
                  <option key={i} value={el.name}>{el.name}</option>
                ))}
              </select>
            </div>
            <div>
              <span>Content *</span>
              <textarea value={content} onChange={(e) => { setContent(e.target.value) }} required></textarea>
            </div>

            <div>
              <label htmlFor="add_image">
                <i className="material-symbols-outlined">add_a_photo</i>
                <input id="add_image" onChange={(e) => { handleMedia(e.target.files[0]) }} type="file" accept="image/*,video/*" style={{ display: 'none' }}/>
              </label>
            </div>
            <section className={styles.img_box}>
              {type === 'image' ?
                <img src={previewMedia} /> :
                <video src={previewMedia} controls></video>
              }
            </section>

            <div>
              <span>Source</span>
              <input type="text" value={source} onChange={e => { setSource(e.target.value) }} />
            </div>
            <div>
              <span>Tags</span>
              <input type="text" value={tags} onChange={e => { setTags(e.target.value) }} placeholder="seperate with commas max(3 tags)" />
            </div>
            <button type="submit">Done</button>
          </form>

          <section className={styles.form_loader}>
            <div>
              <small></small>
              <small></small>
              <small></small>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}

export default Posts;