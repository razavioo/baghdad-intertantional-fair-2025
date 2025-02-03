import React from 'react';
import { Search, X } from 'lucide-react';
import { Filters } from '../types/company';

interface FiltersProps {
  filters: Filters;
  categories: string[];
  countries: string[];
  services: string[];
  products: string[];
  onFilterChange: (filters: Filters) => void;
}

export function FiltersPanel({
  filters,
  categories,
  countries,
  services,
  products,
  onFilterChange,
}: FiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleCountryChange = (country: string) => {
    const newCountries = filters.countries.includes(country)
      ? filters.countries.filter((c) => c !== country)
      : [...filters.countries, country];
    onFilterChange({ ...filters, countries: newCountries });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      categories: [],
      countries: [],
      services: [],
      products: [],
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="جستجوی شرکت‌ها یا اشخاص..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full pr-10 pl-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">دسته‌بندی‌ها</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.categories.includes(category)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">کشورها</h3>
          <div className="flex flex-wrap gap-2">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => handleCountryChange(country)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.countries.includes(country)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        {(filters.categories.length > 0 ||
          filters.countries.length > 0 ||
          filters.search) && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
            پاک کردن فیلترها
          </button>
        )}
      </div>
    </div>
  );
}