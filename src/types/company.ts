export interface Company {
  type: number;
  halls: string[];
  points?: string;
  description: string;
  decor: string;
  area: string;
  id: string;
  countryShort: string;
  categoryShort: string;
  tel: string;
  email: string;
  golden: string;
  request: string;
  contact: string;
  services?: string;
  products?: string;
  address: string;
}

export interface Filters {
  search: string;
  categories: string[];
  countries: string[];
  minArea?: number;
  maxArea?: number;
  services: string[];
  products: string[];
}