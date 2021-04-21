import { riverI } from '../interfaces';
import React from 'react';
import Link from 'next/link';

type Props = {
  rivers: riverI[];
};

const Rivers = ({ rivers }: Props) => {
  return (
    <section className="mb-12 bg-gray-400 flex space-x-4">
      {rivers?.length > 0
        ? rivers.map((river, index) => (
            <Link href={river.name} key={index}>
              <a
                className="font-bold p-2 text-xl hover:bg-green-200"
                key={index}>
                {river.label}
              </a>
            </Link>
          ))
        : null}
    </section>
  );
};

export default Rivers;
