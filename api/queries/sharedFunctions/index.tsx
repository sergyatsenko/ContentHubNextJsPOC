import { productI, assetI, riverI, itineraryI } from '@/interfaces/index';
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
  const riversArray: riverI[] = [];
  riversArray.pop();
  //console.log('---results here----');
  //console.log(riverFeed.data.allSY_River.results);

  riverFeed.data.allSY_River.results.map((r) => {
    const itinerariesArray: itineraryI[] = [];
    itinerariesArray.pop();
    //console.log(r);

    r.itineraryToRivers.results.map((i) => {
      const assetArray: assetI[] = [];
      assetArray.pop();
      i.itineraryToAssets.results.map((pa) => {    
        pa.assetToPublicLink.results.map((publicLink) => {
          if (assetArray.length < 1) {
            //console.log('----base env URL----');
            //console.log(process.env.CH_BASE_URL);
            var baseAssetUrl = 'https://xcdemo4.stylelabsdemo.com/api/public/content/';
            const asset: assetI = {
              relativeUrl: publicLink.relativeUrl,
              versionHash: publicLink.versionHash,
              url:
                //process.env.CH_BASE_URL +
                baseAssetUrl +
                publicLink.relativeUrl +
                '?' +
                publicLink.versionHash,
            };
            assetArray.push(asset);
          }
        });
      });
      //console.log('---one river---');
      const itinerary: itineraryI = {
        name: i.name['en-US'],
        description: i.description['en-US'],
        assets: assetArray,
      };
      itinerariesArray.push(itinerary);

      
    });

    const river: riverI = {
      //id: c.id,
      name: r.taxonomyName,
      label: r.taxonomyLabel['en-US'],
      itineraries: itinerariesArray
      // type: 'productFamily',
      // intentTag: {
      //   intents: i,
      // },
      // slug: c.slug,
    };
    //riversArray.push(river);
    riversArray.push(river);

    // var intent = c.name.toLowerCase();
    // intent = intent.replace(/ /g, '');

    // var i: IntentTagVector = {
    //   [intent]: { str: IntentTagStrength.Normal },
    // };
  });

  return riversArray;
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
