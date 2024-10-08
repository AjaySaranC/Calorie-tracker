import React from 'react';

const AboutPage = () => {
  const styles = {
    aboutPage: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    heading1: {
      fontSize: '32px',
      marginBottom: '20px',
    },
    heading2: {
      fontSize: '24px',
      marginTop: '30px',
      marginBottom: '10px',
    },
    paragraph: {
      fontSize: '16px',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    unorderedList: {
      listStyleType: 'disc',
      marginBottom: '20px',
    },
    listItem: {
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.aboutPage}>
      <h1 style={styles.heading1}>About DocWeb</h1>
      <p style={styles.paragraph}>DocWeb is a cutting-edge platform dedicated to improving healthcare services through advanced technology.</p>

      <h2 style={styles.heading2}>Our Mission</h2>
      <p style={styles.paragraph}>Our mission is to provide efficient and accessible healthcare solutions to individuals worldwide, leveraging technology to enhance early disease detection, mental health support, and nutritional tracking.</p>

      <h2 style={styles.heading2}>Our Services</h2>
      <ul style={styles.unorderedList}>
        <li style={styles.listItem}>Early Heart Disease Detection: Utilizing state-of-the-art algorithms, we offer early detection of heart diseases, enabling timely intervention and prevention.</li>
        <li style={styles.listItem}>Alert System for Hospitals: DocWeb notifies nearby hospitals promptly in the event of heart disease detection, ensuring immediate medical attention for patients.</li>
        <li style={styles.listItem}>Mental Health Chatbot: Our platform features an AI-powered chatbot trained to provide support and guidance for individuals facing mental health challenges.</li>
        <li style={styles.listItem}>Calorie Tracker with Image Recognition: Using advanced image recognition technology, our calorie tracker accurately monitors nutritional intake, facilitating healthier lifestyles.</li>
      </ul>

      <h2 style={styles.heading2}>Why Choose DocWeb?</h2>
      <p style={styles.paragraph}>At DocWeb, we combine expertise in healthcare with cutting-edge technology to deliver personalized and effective solutions. Our commitment to innovation, reliability, and user satisfaction sets us apart in the healthcare industry.</p>

      <h2 style={styles.heading2}>Contact Us</h2>
      <p style={styles.paragraph}>For inquiries or partnership opportunities, please reach out to us at <a href="mailto:contact@docweb.com">contact@docweb.com</a>.</p>
    </div>
  );
}

export default AboutPage;
