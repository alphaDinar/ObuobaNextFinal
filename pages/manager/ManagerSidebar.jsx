import Link from 'next/link';
import { icon } from '../../External/external';
import styles from './managerSidebar.module.css';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { fireAuth } from '../../Firebase/base';
import { useRouter } from "next/router";

const ManagerSidebar = () => {
  const router = useRouter();
  const [sidebarToggled, setSidebarToggled] = useState(false);

  const toggleSidebar=()=>{
    sidebarToggled ? setSidebarToggled(false) : setSidebarToggled(true);
  }

  useEffect(()=>{
    console.log('mr')
    onAuthStateChanged(fireAuth, (user)=>{
      if(!user){
        router.push('/manager/login')
      }
    })
  })

  const logoutUser =()=>{
    signOut(fireAuth)
    .then(()=>{
      console.log('logged Out')
    })
  }

  return (
    <section className={ sidebarToggled ? `${styles.sideBar} ${styles.change}` : styles.sideBar}>
      <button style={{cursor:'pointer'}} onClick={toggleSidebar}>{icon('linear_scale')}</button>
      <header>
        <img src="https://res.cloudinary.com/dvnemzw0z/image/upload/v1692289104/logo_2_nxwecd.png" alt="" />
      </header>
      <nav>
        <Link href={'/manager/programs'}>
          <a>{icon('mic')} <span>Programs</span></a>
        </Link>
        <Link href={'/manager/posts'}>
          <a>{icon('post_add')} <span>Posts</span></a>
        </Link>
        <Link href={'/manager/teams'}>
          <a>{icon('group')} <span>Teams</span></a>
        </Link>
      </nav>
      <footer>
        <a onClick={logoutUser}><i className="material-symbols-outlined">power_settings_new</i> <span>Logout</span></a>
      </footer>
    </section>
  );
}

export default ManagerSidebar;