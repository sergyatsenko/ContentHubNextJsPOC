import { productI, assetI, productCategoryI, riverI, itineraryI } from '@/interfaces/index';
import {
  IntentTagVector,
  IntentTags,
  IntentTagStrength,
} from '@uniformdev/optimize-common';

export const convertIntents = (value: string[]): IntentTags | undefined => {
  if (!value.length) {
    return null;
  }

  return {
    intents: value.reduce<IntentTagVector>((previous, current) => {
      previous[current] = {
        str: 50,
      };
      return previous;
    }, {}),
  };
};

export function riverItinerariesParse(riverFeed): riverI[] {
  const riverArray: riverI[] = [];
  riverArray.pop();

//console.log(riverFeed.data.allSY_River.results);
  riverFeed.data.allSY_River.results.map((c) => {
    const itineraryArray: itineraryI[] = [];
    itineraryArray.pop();

    c.itineraryToRivers.results.map((p) => {
      const assetArray: assetI[] = [];
      assetArray.pop();
      p.itineraryToAssets.results.map((pa) => {
        pa.assetToPublicLink.results.map((publicLink) => {
          if (assetArray.length < 1) {
            const asset: assetI = {
              relativeUrl: publicLink.relativeUrl,
              versionHash: publicLink.versionHash,
              url:
                process.env.CH_BASE_URL +
                publicLink.relativeUrl +
                '?' +
                publicLink.versionHash,
            };
            assetArray.push(asset);
          }
        });
      });

      const itinerary: itineraryI = {
        name: p.name['en-US'],
        description: p.description['en-US'],
        assets: assetArray,
      };

      itineraryArray.push(itinerary);
    });

    const river: riverI = {
      //id: c.id,
      name: c.taxonomyName,
      label: c.taxonomyLabel['en-US'],
      itineraries: itineraryArray
      // type: 'productFamily',
      // intentTag: {
      //   intents: i,
      // },
      // slug: c.slug,
    };
    riverArray.push(river);
    // var intent = c.name.toLowerCase();
    // intent = intent.replace(/ /g, '');

    // var i: IntentTagVector = {
    //   [intent]: { str: IntentTagStrength.Normal },
    // };
  });

  return riverArray;
};

export function productsParse(productFeed): productI[] {
  console.log(productFeed);
  const productArray: productI[] = [];
  productArray.pop();

  productFeed.data.allM_PCM_Product.results.map((p) => {
    const assetArray: assetI[] = [];
    assetArray.pop();
    p.pCMProductToAsset.results.map((pa) => {
      pa.assetToPublicLink.results.map((publicLink) => {
        if (assetArray.length < 1) {
          const asset: assetI = {
            relativeUrl: publicLink.relativeUrl,
            versionHash: publicLink.versionHash,
            url:
              process.env.CH_BASE_URL +
              publicLink.relativeUrl +
              '?' +
              publicLink.versionHash,
          };
          assetArray.push(asset);
        }
      });
    });

    const product: productI = {
      productName: p.productName,
      productShortDescription: p.productShortDescription['en-US'],
      productLongDescription: p.productLongDescription['en-US'],
      assets: assetArray,
    };
    productArray.push(product);
  });
  return productArray;
}
