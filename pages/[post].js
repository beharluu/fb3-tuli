import React from "react";
import { useState } from 'react';
import Head from 'next/head';

import styles from '../styles/Post.module.css';

export const runtime = 'experimental-edge';

const Post = (post) => {

    const [title, setTitle] = useState(post?.title);
    const [featuredImage, setFeaturedImage] = useState(post.featuredImage);

    return (
    <>
        <Head>
            <title>{title}</title>
            <meta property="og:image" content={featuredImage} key="image" />
      </Head>
      <div className={styles.main}>
        <div className={styles.box}>

            <div className={styles.nav}>
                <ul>

                    <li><a>Home</a></li>
                    <li><a>News</a></li>
                    <li><a>Contact</a></li>
                    <li><a>About</a></li>

                </ul>
            </div>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <img className={styles.featureImage} src={featuredImage}/>
            </div>           
        </div>
      </div>
    </>
    )
};

export default Post;

Post.getInitialProps = async ({ req }) => {

    let response = await fetch(`${process.env.website_url}/wp-json/wp/v2/posts${req.url}`)
    response = await response.json();

    let url = response?.yoast_head_json?.og_image[0]?.url;
    const uploadsIndex = url.indexOf('uploads/') + 'uploads/'.length;
    const textAfterUploads = url.substring(uploadsIndex);
    const domainUrl = req.headers.host;
    let featuredImage = `https://${domainUrl}/wp-content/uploads/${textAfterUploads}`
    let title = response?.title?.rendered;

    return { title, featuredImage }
}