import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Company } from '../types/company';
import { cn } from '../lib/utils';

interface CompanyModalProps {
  company: Company;
  onClose: () => void;
  className?: string;
}

export function CompanyModal({ company, onClose, className }: CompanyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50", className)} ref={modalRef}>
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 gap-6 p-6">
          <div>
            <h2 className={cn(
              "text-2xl font-bold mb-4",
              company.golden === "1" && "text-amber-600"
            )}>
              {company.description}
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Contact Person: {company.contact}</p>
                  <p>Phone: <span dir="ltr">{company.tel}</span></p>
                  <p>Email: <span dir="ltr">{company.email}</span></p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Address: {company.address}</p>
                  <p>Booth: {company.halls.join(', ')}</p>
                  <p>Area: {company.area} sq. meters</p>
                  <p>Type: {company.type}</p>
                  <p>ID: {company.id}</p>
                  <p>Category: {company.categoryShort}</p>
                  <p>Country: {company.countryShort}</p>
                  <p>Decor: {company.decor}</p>
                  <p>Golden: {company.golden}</p>
                </div>
              </div>

              {company.products && (
                <div>
                  <h3 className="font-semibold mb-2">Products</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.products.split(',').map((product) => (
                      <span
                        key={product}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {product.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {company.services && (
                <div>
                  <h3 className="font-semibold mb-2">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.services.split(',').map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {service.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CompanyModal;
