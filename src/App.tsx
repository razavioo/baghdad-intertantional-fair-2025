import React, { useState } from 'react';
import { Grid, List } from 'lucide-react';
import { CompanyCard } from './components/CompanyCard';
import { CompanyModal } from './components/CompanyModal';
import { FiltersPanel } from './components/Filters';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Company, Filters } from './types/company';
import { cn } from './lib/utils';

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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

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
    const searchTerm = filters.search.toLowerCase();
    const matchesSearch = !filters.search ||
      company.description.toLowerCase().includes(searchTerm) ||
      company.contact.toLowerCase().includes(searchTerm) ||
      company.decor.toLowerCase().includes(searchTerm) ||
      company.area.toLowerCase().includes(searchTerm) ||
      company.countryShort.toLowerCase().includes(searchTerm) ||
      company.categoryShort.toLowerCase().includes(searchTerm) ||
      company.tel.toLowerCase().includes(searchTerm) ||
      company.email.toLowerCase().includes(searchTerm) ||
      company.golden.toLowerCase().includes(searchTerm) ||
      company.request.toLowerCase().includes(searchTerm) ||
      (company.services && company.services.toLowerCase().includes(searchTerm)) ||
      (company.products && company.products.toLowerCase().includes(searchTerm)) ||
      company.address.toLowerCase().includes(searchTerm);

    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(company.categoryShort);
    const matchesCountry = filters.countries.length === 0 || filters.countries.includes(company.countryShort);
    const matchesServices = filters.services.length === 0 || filters.services.some(service => company.services?.toLowerCase().includes(service.toLowerCase()));

    return matchesSearch && matchesCategory && matchesCountry && matchesServices;
  });

  return (
    <div className={cn("min-h-screen font-vazir", isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-black")} style={{direction: 'ltr'}}>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 flex-shrink-0">
            <FiltersPanel
              filters={filters}
              categories={categories}
              countries={countries}
              services={services}
              onFilterChange={setFilters}
            />
          </div>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-400">Companies ({filteredCompanies.length})</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} onClick={() => setSelectedCompany(company)} />
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No companies found with the selected criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      {selectedCompany && (
        <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />
      )}
    </div>
  );
}

export default App;
