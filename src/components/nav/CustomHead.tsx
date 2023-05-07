"use client"
import Head from "next/head";
import React from "react";

interface Props {
  metadata: {
    titleKeywords: string;
    title: string;
    description: string;
    slug: string;
  };
}
function CustomHead({ metadata }: Props) {
  return (
    <Head>
      <title>
        {metadata.titleKeywords}{metadata.title}
      </title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* canonical */}
      <link
        rel="canonical"
        href={`https://www.erickulbiej.com/${metadata.slug}`}
      />
      <meta name="description" content={metadata.description} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.erickulbiej.com" />
      <meta
        property="og:image"
        content="https://www.erickulbiej.com/images/og-image.jpg"
      />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:url" content="https://www.erickulbiej.com" />
      <meta
        name="twitter:image"
        content="https://www.erickulbiej.com/images/twitter-image.jpg"
      />
    </Head>
  );
}

export default CustomHead;
