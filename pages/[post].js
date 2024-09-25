import React from "react";
import { useState } from 'react';
import Head from 'next/head';

import styles from '../styles/Post.module.css';

export const runtime = 'experimental-edge';

const Post = (post) => {

    const [title, setTitle] = useState(post?.title);
    const [featuredImage, setFeaturedImage] = useState(post?.featuredImage);
    const [iframeSrc, setIframeSrc] = useState(post?.link);


    return (
    <>
        <Head>
            <title>{title}</title>
            <meta property="og:image" content={featuredImage} key="image" />
      </Head>
      <iframe           className={styles.iframe} 
                        src={iframeSrc} 
                        style={{ width: '100%', height: '100vh', border: 'none' }} 
                        title="Post Content"
                    />
    </>
    )
};

export default Post;

export const getServerSideProps = async (context) => {
    const { req } = context;
    const postId = req.url.split('/').pop(); // Adjust according to your URL structure

    console.log(postId);
    
    const response = await fetch(`${process.env.website_url}/wp-json/wp/v2/posts/${postId}`);
    const post = await response.json();

    console.log(post?.link);

    // Handle errors if needed
    if (!response.ok) {
        return { notFound: true };
    }

    const featuredImage = post?.yoast_head_json?.og_image[0]?.url;
    const title = post?.title?.rendered;

    return { props: { title, featuredImage, link: post?.link } };
};
