import React, { useEffect, useState } from "react";
import Head from 'next/head';
import Script from 'next/script';
import styles from '../styles/Post.module.css';

export const runtime = 'experimental-edge';

const Post = ({ title, featuredImage, link }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:image" content={featuredImage} key="image" />
            </Head>

            {/* Google Analytics tag */}
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-7CTLS8MJKB"
            />
            <Script id="google-analytics-config" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-7CTLS8MJKB');
                `}
            </Script>

            <iframe
                className={styles.iframe}
                src={link} 
                style={{ width: '100%', height: '100vh', border: 'none' }} 
                title="Post Content"
            />
        </>
    );
};

export default Post;

export const getServerSideProps = async (context) => {
    const { req } = context;
    const postId = req.url.split('/').pop(); // Adjust according to your URL structure

    const response = await fetch(`${process.env.website_url}/wp-json/wp/v2/posts/${postId}`);
    const post = await response.json();

    if (!response.ok) {
        return { notFound: true };
    }

    const featuredImage = post?.yoast_head_json?.og_image[0]?.url;
    const title = post?.title?.rendered;

    return { props: { title, featuredImage, link: post?.link } };
};
