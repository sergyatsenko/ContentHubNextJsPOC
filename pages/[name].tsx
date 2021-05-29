import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Footer from 'components/footer';
// import { getCategories } from '@/api/queries/getCategories';
import { getRiver } from '@/api/queries/getRiver';
import River from 'components/river';
import { dataI } from '@/interfaces/index';
import React from 'react';
import Header from 'components/header';
import { getRivers } from '@/api/queries/getRivers';

export default function RiverDetails(props: dataI) {
  return (
    <div className="container mx-auto px-5">
      <Head>
        <title>
          The Sitecore Experience Edge for Content Hub - Details page!
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header preview={props.preview} />
      <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        {props.rivers?.length > 0
          ? props.rivers.map((river, index) => (
              <div key={index}>
                <River river={river} trackBehavior={true} />
              </div>
            ))
          : null}
      </section>

      <Footer preview={props.preview} name={props.name} />
    </div>
  );
}
export const getStaticProps: GetStaticProps = async ({
  preview = false,
  params,
}) => {
  let name = '';
  if (Array.isArray(params.name)) {
    name = params.name.pop();
  } else {
    name = params.name;
  }

  const { rivers } = await getRiver(preview, name);
  return {
    props: {
      rivers,
      preview,
      name,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { rivers } = await getRivers(true);
  const paths = rivers
    .map((river) => {
      return { params: { name: river.name } };
    })
    .flat();
  return {
    paths: paths,
    fallback: false,
  };
};
