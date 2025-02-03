import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categoryMap: Record<string, string> = {
  'agri': 'Agriculture',
  'tools': 'Tools and Equipment',
  'cosm': 'Cosmetics and Personal Care',
  'food': 'Food and Beverage',
  'clothes': 'Clothing and Apparel',
  'en': 'Engineering and Construction',
  'oth': 'Other'
};

export const countryMap: Record<string, string> = {
  'iq': 'Iraq',
  'iqf': 'Iraq',
  'iqp': 'Iraq',
  'iqpf': 'Iraq',
  'eg': 'Egypt',
  'jo': 'Jordan',
  'sa': 'Saudi Arabia',
  'tr': 'Turkey',
  'kw': 'Kuwait',
  'ir': 'Iran'
};
