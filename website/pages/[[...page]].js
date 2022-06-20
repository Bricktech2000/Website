import React, { Component, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import postMap from '../records/postMap';
import errorMap from '../records/errorMap';
import pageMap from '../records/pageMap';

import App from '../components/structure/App';
import BuiltMapGrid from '../components/structure/BuiltMapGrid';

const Page = (props) => {
  const router = useRouter();
  const page = ((router.query ?? props).page ?? [])[0] ?? '';
  const id = page;
  return (
    <App
      title={props.ogTitle}
      description={props.ogDescription}
      image={props.ogImage}
    >
      <BuiltMapGrid page={page} />
    </App>
  );
};

// https://nextjs.org/docs/basic-features/data-fetching
// https://nextjs.org/docs/routing/dynamic-routes

import { promises as fs } from 'fs';

export async function getServerSideProps(router) {
  const page = (router.query.page ?? [])[0] ?? '';
  const id = page;

  const isError = errorMap.includes(page);
  const isPost = postMap.includes(page);
  const isPage = pageMap.includes(page);

  if (isPage) {
    return {
      props: {
        ogTitle: 'Project Portfolio',
        ogDescription: 'A portfolio for sharing various projects',
        ogImage: 'picture.jpg',
        page: router.query.page ?? null,
      },
    };
  } else {
    const info = JSON.parse(
      await fs.readFile(
        process.cwd() + `/public/${isError || isPost ? id : '404'}/index.json`
      )
    );

    return {
      props: {
        ogTitle: info.title,
        ogDescription: info.desc,
        ogImage: `${id}/index.jpg`,
        page: router.query.page ?? null,
      },
    };
  }
}

export default Page;
