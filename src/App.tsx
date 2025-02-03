import React, { useState } from 'react';
import { Grid, List } from 'lucide-react';
import { CompanyCard } from './components/CompanyCard';
import { CompanyModal } from './components/CompanyModal';
import { FiltersPanel } from './components/Filters';
import { Company, Filters } from './types/company';

import mockCompanies from './data/company.json';

function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    categories: [],
    countries: [],
    services: [],
    products: [],
  });

  const categories = Array.from(new Set(mockCompanies.map(c => c.categoryShort)));
  const countries = Array.from(new Set(mockCompanies.map(c => c.countryShort)));
  const services = Array.from(
    new Set(
      mockCompanies
        .map(c => c.services?.split(',').map(s => s.trim()) || [])
        .flat()
    )
  );
  const products = Array.from(
    new Set(
      mockCompanies
        .flatMap(c => c.products?.split(',').map(p => p.trim()) || [])
    )
  );

  const filteredCompanies = mockCompanies.filter(company => {
        const matchesSearch = filters.search
          ? company.description.toLowerCase().includes(filters.search.toLowerCase()) ||
            company.contact.toLowerCase().includes(filters.search.toLowerCase()) ||
            company.decor.toLowerCase().includes(filters.search.toLowerCase()) ||
            company.area.toLowerCase().includes(filters.search.toLowerCase()) ||
            company.countryShort.toLowerCase().includes(filters.search.toLowerCase()) ||
            company.categoryShort.toLowerCase().includes(filters.search.toLowerCase()) ||
            company.tel.toLowerCase().includes(filters.search.toLowerCase()) ||
            company.email.toLowerCase().includes(filters.search.toLowerCase()) ||
            company.golden.toLowerCase().includes(filters.search.toLowerCase()) ||
            company.request.toLowerCase().includes(filters.search.toLowerCase()) ||
            (company.services && company.services.toLowerCase().includes(filters.search.toLowerCase())) ||
            (company.products && company.products.toLowerCase().includes(filters.search.toLowerCase())) ||
            company.address.toLowerCase().includes(filters.search.toLowerCase())
          : true;

    const matchesCategory = filters.categories.length === 0 || 
      filters.categories.includes(company.categoryShort);

    const matchesCountry = filters.countries.length === 0 ||
      filters.countries.includes(company.countryShort);

    const matchesServices = filters.services.length === 0 ||
      filters.services.some(service => 
        company.services?.toLowerCase().includes(service.toLowerCase())
      );

    const matchesProducts = filters.products.length === 0 ||
      filters.products.some(product => 
        company.products?.toLowerCase().includes(product.toLowerCase())
      );

    return matchesSearch && matchesCategory && matchesCountry && 
           matchesServices && matchesProducts;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-vazir" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 flex-shrink-0">
            <FiltersPanel
              filters={filters}
              categories={categories}
              countries={countries}
              services={services}
              products={products}
              onFilterChange={setFilters}
            />
          </div>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">شرکت‌ها</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

                  

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  onClick={() => setSelectedCompany(company)}
                />
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">شرکتی با معیارهای انتخاب شده یافت نشد</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedCompany && (
        <CompanyModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
}

export default App;
