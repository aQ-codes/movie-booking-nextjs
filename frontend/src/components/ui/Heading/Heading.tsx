'use client';

import React from 'react';
import styles from './Heading.module.css';

interface ReusableHeadingProps {
  heading: string;
  content?: string;
}

const Heading: React.FC<ReusableHeadingProps> = ({ heading, content }) => {
  return (
    <div className={styles.headingcontainer}>
      <h1 className={styles.heading}>{heading}</h1>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default Heading;
