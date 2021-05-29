import { riverI } from '../interfaces';
import CoverImage from 'components/cover-image';
import { useBehaviorTracking } from '@uniformdev/optimize-tracker-react';

type Props = {
  river: riverI;
  trackBehavior: boolean;
};

const River = ({ river, trackBehavior }: Props) => {
  // if (trackBehavior) {
  //   useBehaviorTracking(category.intentTag);
  // }
  return (
    <section>
      <div>
        <h2 className="text-3xl mb-3 leading-snug">
          <a className="hover:underline">River: {river.name}</a>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
          {river.itineraries?.length > 0
            ? river.itineraries.map((itinerary, index) => (
                <div key={index}>
                  <div className="mb-5">
                    {/* <h2>URL: {itinerary.assets[0]?.url}</h2> */}
                    <CoverImage
                      src={itinerary.assets[0]?.url}
                      title={itinerary.name}
                    />
                  </div>
                  <p className="text-sm">Itinerary Name:</p>
                  <h2>
                    <a className="hover:underline" key={index}>
                      {itinerary.name}
                    </a>
                  </h2>
                  <p className="text-sm">Itinerary Description:</p>
                  <div className="text-lg mb-4">
                    
                    <div
                      dangerouslySetInnerHTML={{
                        __html: itinerary.description,
                      }}
                    />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </section>
  );
};

export default River;
