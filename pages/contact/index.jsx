import { useEffect } from "react";
import TopNav from "../Components/TopNav/TopNav";
import { useLoader } from "../_app";
import Link from "next/link";

const Contact = () => {
  const { setLoader } = useLoader();

  useEffect(() => {
    setLoader(false)
  }, [])

  return (
    <>
      <TopNav />
      <section className="page">
        <section class="about_box">
          <h3>Contact Us</h3>
          <Link href={'/'}>
            <a>
              <img src="https://res.cloudinary.com/dvnemzw0z/image/upload/v1692289104/logo_2_nxwecd.png" />
            </a>
          </Link>
          <hr />
          <p>
            <a href="tel: +233531387554"> <i class="material-symbols-outlined">phone</i> <span>+233 53 138 7554</span></a>
            <a href=""> <i class="material-symbols-outlined">phone</i> <span>+233 55842 0368</span></a>
            <a href=""> <i class="material-symbols-outlined">phone</i> <span>+233 55842 0368</span></a>
          </p>
          <hr />
          <p>
            <a><i class="material-symbols-outlined">pin_drop</i> <span>Nkawkaw</span></a>
            <a><i class="material-symbols-outlined">my_location</i> <span>Plot 2, Lane 4</span></a>
          </p>
          <hr />
          <p>
            <Link href="mailto : info@obuoba.com">
              <a style={{ color: 'salmon' }} className="fa-solid fa-envelope"></a>
            </Link>
            <Link href="">
              <a style={{ color: 'palevioletred' }} className="fa-brands fa-instagram"></a>
            </Link>
            <Link href="">
              <a style={{ color: '#4867aa' }} className="fa-brands fa-facebook"></a>
            </Link>
            <Link href="">
              <a style={{ color: '#1da1f2' }} className="fa-brands fa-twitter" ></a>
            </Link>
          </p>
        </section>
      </section>
    </>
  );
}

export default Contact;