import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { Filters } from '../types/company';

interface FiltersPanelProps {
  filters: Filters;
  categories: string[];
  countries: string[];
  services: string[];
  onFilterChange: (filters: Filters) => void;
}

export function FiltersPanel({
  filters,
  categories,
  countries,
  services,
  onFilterChange,
}: FiltersPanelProps) {
  return (
    <aside className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-64">
      <div className="space-y-4">
        <div>
          <label className="text-gray-700 dark:text-orange-400">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
          />
        </div>

        <div>
          <label className="text-gray-700 dark:text-gray-300">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  const newCategories = filters.categories.includes(category)
                    ? filters.categories.filter((c) => c !== category)
                    : [...filters.categories, category];
                  onFilterChange({ ...filters, categories: newCategories });
                }}
                className={cn(
                  "px-3 py-1 text-xs rounded focus:outline-none",
                  filters.categories.includes(category)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-gray-700 dark:text-gray-300">Countries</label>
          <div className="flex flex-wrap gap-2">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => {
                  const newCountries = filters.countries.includes(country)
                    ? filters.countries.filter((c) => c !== country)
                    : [...filters.countries, country];
                  onFilterChange({ ...filters, countries: newCountries });
                }}
                className={cn(
                  "px-3 py-1 text-xs rounded focus:outline-none",
                  filters.countries.includes(country)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                )}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-gray-700 dark:text-gray-300">Services</label>
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <button
                key={service}
                onClick={() => {
                  const newServices = filters.services.includes(service)
                    ? filters.services.filter((s) => s !== service)
                    : [...filters.services, service];
                  onFilterChange({ ...filters, services: newServices });
                }}
                className={cn(
                  "px-3 py-1 text-xs rounded focus:outline-none",
                  filters.services.includes(service)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                )}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default FiltersPanel;
