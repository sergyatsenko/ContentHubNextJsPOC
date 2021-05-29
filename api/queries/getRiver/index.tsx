import { fetchGraphQL } from 'api';
import { riverI } from '@/interfaces/index';
import { riverItinerariesParse } from '../sharedFunctions';
//import { riverProductsParse } from '../sharedFunctions';

export const getRiver = async (
  preview: boolean,
  name: string,
): Promise<{ rivers: riverI[] }> => {
  try {
    const riverQuery: any = `
    query {
      allSY_River (where: {taxonomyName_eq:"${name}"}) {
        results {
          id
          taxonomyName
          taxonomyLabel
          itineraryToRivers {
            results {
              id
              name
              description
              itineraryToAssets {
                results {
                  id
                  fileName
                  assetToPublicLink {
                    results {
                      id
                      relativeUrl
                      versionHash
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
        `;
    const rivers: any = await fetchGraphQL(riverQuery, preview);
    const itinerariesArray: riverI[] = riverItinerariesParse(
      rivers,
    );
    return {
      rivers: itinerariesArray,
    };
  } catch (err) {
    console.log(err);
    return {
      rivers: null,
    };
  }
};
