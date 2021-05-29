import { IntentTags } from '@uniformdev/optimize-common';

export interface productI {
  productName: string;
  productShortDescription: string;
  productLongDescription: string;
  assets: assetI[];
}

export interface assetI {
  relativeUrl: string;
  versionHash: string;
  url: string;
}

export interface dataI {
  rivers: riverI[];
  preview: boolean;
  name: string;
}

export interface productDataI {
  products: productI[];
  preview: boolean;
}

// export interface productCategoryI {
//   type?: string;
//   intentTag: IntentTags | undefined | null;
//   id: string;
//   productFamilyName: string;
//   products: productI[];
//   //slug: string;
// }

export interface riverI {
  name: string;
  label: string;
  itineraries: itineraryI[];
  //slug: string;
}

export interface itineraryI {
  name: string;
  description: string;
  assets: assetI[];
}