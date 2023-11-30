import { useEffect } from "react";
import TopNav from "../Components/TopNav/TopNav";
import { useLoader } from "../_app";
import Link from "next/link";

const About = () => {
  const { setLoader } = useLoader();

  useEffect(() => {
    setLoader(false)
  })

  return (
    <>
      <TopNav />
      <section className='page'>
        <section className="about_box">
          <h3>About Us</h3>
          <Link href={'/'}>
            <a>
              <img src="https://res.cloudinary.com/dvnemzw0z/image/upload/v1692289104/logo_2_nxwecd.png" />
            </a>
          </Link>
          <p>
            Welcome to Obuaba FM, your number one source for all things radio in Obuasi and beyond. We are dedicated to
            providing you with the best radio experience, bringing you the latest news, entertainment, and music right to your
            ears.
            At Obuaba FM, we believe in the power of radio to connect and uplift communities. Our team of talented and
            passionate radio hosts work tirelessly to bring you informative and engaging content that resonates with our
            listeners. Whether you&apos;re looking for breaking news updates, insightful interviews, or simply want to unwind with
            some good music, we&apos;ve got you covered.
            <br />
            Furthermore, we understand the importance of community involvement. That&apos;s why we actively engage with our listeners
            through various interactive platforms such as social media, where you can connect with us, share your thoughts, and
            even request songs. We value your feedback and strive to create a radio experience that truly caters to your
            interests and preferences.

            Thank you for visiting Obuaba FM. We invite you to explore our website and discover all that we have to offer. Tune
            in, stay connected, and let us be your trusted companion in the world of radio.

          </p>
        </section>
      </section>
    </>
  );
}

export default About;