import React from 'react';
import { Building2, Mail, Phone, MapPin, User, Hash } from 'lucide-react';
import { Company } from '../types/company';
import { cn, categoryMap, countryMap } from '../lib/utils';

interface CompanyCardProps {
  company: Company;
  onClick: () => void;
}

export function CompanyCard({ company, onClick }: CompanyCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-6 rounded-lg shadow-md transition-all cursor-pointer hover:shadow-lg",
        "bg-white border",
        company.golden === "1" ? "border-amber-400 hover:border-amber-500" : "border-gray-200 hover:border-gray-300"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className={cn(
          "text-xl font-semibold",
          company.decor === "1" && "font-bold"
        )}>
          {company.description}
        </h3>
        {company.golden === "1" && (
          <span className="px-2 py-1 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full">
            طلایی
          </span>
        )}
      </div>

      <div className="space-y-2 text-gray-600">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          <span>
            {categoryMap[company.categoryShort] || company.categoryShort} | {countryMap[company.countryShort] || company.countryShort}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{company.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span dir="ltr">{company.tel}</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span dir="ltr">{company.email}</span>
        </div>

        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{company.contact}</span>
        </div>
        {company.points && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span dir="ltr">{company.points}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4" />
          <span>غرفه {company.halls.join(', ')}</span>
        </div>
      </div>

      {(company.products || company.services) && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {company.products && (
            <div className="mb-2">
              <span className="text-sm font-semibold">محصولات:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {company.products.split(',').map((product) => (
                  <span
                    key={product}
                    className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                  >
                    {product.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {company.services && (
            <div>
              <span className="text-sm font-semibold">خدمات:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {company.services.split(',').map((service) => (
                  <span
                    key={service}
                    className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded"
                  >
                    {service.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CompanyCard;
