import { useEffect, useState } from "react";
import styles from './login.module.css';
import { useLoader } from "../../_app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../../../Firebase/base";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const {setLoader} = useLoader();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(()=>{
    setLoader(false)
  })

  const loginUser =()=>{
    signInWithEmailAndPassword(fireAuth,email, password)
    .then((res)=>{
      router.push('/manager/programs')
      console.log(res.user)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return ( 
    <section className={styles.page}>
      <form className={styles.formBox} onSubmit={(e)=>{e.preventDefault(); loginUser()}}>
        <div>
          <span>Email</span>
          <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
        </div>
        <div>
          <span>Password</span>
          <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
   );
}
 
export default Login;