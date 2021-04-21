import { itineraryI } from '../interfaces';
import React from 'react';
import Link from 'next/link';

type Props = {
  itineraries: itineraryI[];
};

const Itineraries = ({ itineraries }: Props) => {
  return (
    <section className="mb-12 bg-gray-400 flex space-x-4">
      {itineraries?.length > 0
        ? itineraries.map((itinerary, index) => (
          <div key={index}>
            <h3 className="text-3xl mb-3 leading-snug">
                <a className="hover:underline" key={index}>
                  {itinerary.name}
                </a>
            </h3>
            <p>
              {itinerary.description}
            </p>
          </div>
          ))
        : null}
    </section>
  );
};

export default Itineraries;
