import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsePoints(points?: string): [number, number][] | null {
  if (!points) return null;
  
  // Split the points string into pairs of coordinates
  const coordinates = points.trim().split(' ');
  
  return coordinates.map(coord => {
    const [x, y] = coord.split(',').map(Number);
    if (isNaN(x) || isNaN(y)) return null;
    return [x, y];
  }).filter((coord): coord is [number, number] => coord !== null);
}

export function formatPhoneNumber(tel: string): string {
  // Keep the original format for international numbers
  return tel;
}

export const categoryMap: Record<string, string> = {
  'agri': 'کشاورزی',
  'tools': 'ابزار',
  'cosm': 'لوازم آرایشی',
  'food': 'مواد غذایی',
  'clothes': 'پوشاک',
  'en': 'مهندسی',
  'oth': 'متفرقه'
};

export const countryMap: Record<string, string> = {
  'iq': 'عراق',
  'iqf': 'عراق',
  'iqp': 'عراق',
  'iqpf': 'عراق',
  'eg': 'مصر',
  'jo': 'اردن'
};