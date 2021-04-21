import { fetchGraphQL } from 'api';
import { riverI } from '@/interfaces/index';
import { riverItinerariesParse } from '../sharedFunctions';

export const getRivers = async (
  preview: boolean,
): Promise<{ rivers: riverI[] }> => {
  try {
    const riverQuery: any = `
    query {
      allSY_River {
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
    
    const riverFeed: any = await fetchGraphQL(riverQuery, preview);
    console.log(riverFeed);
    const riversArray: riverI[] = riverItinerariesParse(
      riverFeed,
    );
    return {
      rivers: riversArray,
    };
  } catch (err) {
    console.log(err);
    return {
      rivers: null,
    };
  }
};
