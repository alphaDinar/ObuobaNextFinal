import Link from "next/link";
import TopNav from "../Components/TopNav/TopNav";
import { useEffect } from "react";
import { useLoader } from "../_app";

const Terms = () => {
  const {setLoader} = useLoader();

  useEffect(()=>{
    setLoader(false)
  },[])

  return (
    <>
      <TopNav />
      <section className="page">
        <section className="aboutBoxHolder" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <section class="about_box">
            <h3>Terms And Policies</h3>
            <Link href={'/'}>
              <a>
                <img src="https://res.cloudinary.com/dvnemzw0z/image/upload/v1692289104/logo_2_nxwecd.png" />
              </a>
            </Link>
            <section>
              <p>
                Welcome to Obuaba FM&apos;s website. By accessing and using this website, you agree to comply with these Terms &
                Conditions. If you disagree with any part of these terms, please do not use our website.
              </p>
              <p>
                1. Intellectual Property Rights: a. All content on this website, including but not limited to text, graphics, logos, images, audio clips, and software, is the property of Obuaba FM and is protected by copyright laws. b. You may not reproduce, distribute, modify, or use any of the content without obtaining prior written permission from Obuaba FM.
              </p>
              <p>
                2. Use of Website: a. This website is for personal and non-commercial use only. You may not use it for any unlawful purpose or in a way that could harm or disrupt the website or its users. b. You agree to provide accurate and up-to-date information when using our website and to not impersonate any other person or entity.
              </p>
              <p>
                3. Third-Party Links: a. Our website may contain links to third-party websites for your convenience. However, we do not endorse, control, or guarantee the accuracy or quality of the content on these websites. b. Obuaba FM is not responsible for any loss or damage that may arise from your use of these third-party websites.
              </p>
              <p>
                4. Limitation of Liability: a. Obuaba FM shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use or inability to use our website. b. We make no warranties or representations about the accuracy or completeness of the content on our website.
              </p>
              <p>
                5. Modifications: a. Obuaba FM reserves the right to modify or discontinue any aspect of this website without prior notice. b. We may also revise these Terms & Conditions at any time. By continuing to use the website, you agree to be bound by the updated Terms & Conditions.
              </p>
            </section>
          </section>

          <section class="about_box">
            <h3>Privacy Policy</h3>
            <section>
              <p>
                Your privacy is important to us. This Privacy Policy outlines how Obuaba FM collects, uses, and protects your personal information when you use our website.
              </p>
              <p>
                1. Information We Collect: a. We may collect personal information, such as your name and email address, when you voluntarily provide it to us through forms or when subscribing to our newsletter. b. We may also collect non-personal information, such as your IP address and browser type, to analyze trends and improve our website&apos;s performance.
              </p>
              <p>
                2. Use of Information: a. We may use your personal information to respond to your inquiries, send you newsletters, and provide you with information about our services. b. We do not sell, rent, or share your personal information with third parties, unless required by law.
              </p>
              <p>
                3. Security: a. We take reasonable precautions to protect your personal information from unauthorized access, disclosure, or alteration. b. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              <p>
                4. Security: a. We take reasonable precautions to protect your personal information from unauthorized access, disclosure, or alteration. b. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              <p>
                5. Changes to Privacy Policy: a. We may update this Privacy Policy from time to time. It is your responsibility to review this page periodically for any changes. b. By using our website, you agree to be bound by the current version of the Privacy Policy.
              </p>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}

export default Terms;