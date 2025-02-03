import React from 'react';
import { X } from 'lucide-react';
import { Company } from '../types/company';
import { cn } from '../lib/utils';

interface CompanyModalProps {
  company: Company;
  onClose: () => void;
  className?: string;
}

export function CompanyModal({ company, onClose, className }: CompanyModalProps) {
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50", className)}>
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <h2 className={cn(
              "text-2xl font-bold mb-4",
              company.golden === "1" && "text-amber-600"
            )}>
              {company.description}
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">اطلاعات تماس</h3>
                <div className="space-y-2 text-gray-600">
                  <p>شخص تماس: {company.contact}</p>
                  <p>تلفن: <span dir="ltr">{company.tel}</span></p>
                  <p>ایمیل: <span dir="ltr">{company.email}</span></p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">موقعیت</h3>
                <div className="space-y-2 text-gray-600">
                  <p>آدرس: {company.address}</p>
                  <p>غرفه: {company.halls.join(', ')}</p>
                  <p>مساحت: {company.area} متر مربع</p>
                  <p>نوع: {company.type}</p>
                  <p>شناسه: {company.id}</p>
                  <p>دسته بندی: {company.categoryShort}</p>
                  <p>کشور: {company.countryShort}</p>
                  <p>دکور: {company.decor}</p>
                  <p>طلایی: {company.golden}</p>
                </div>
              </div>


              {company.products && (
                <div>
                  <h3 className="font-semibold mb-2">محصولات</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.products.split(',').map((product) => (
                      <span
                        key={product}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {product.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {company.services && (
                <div>
                  <h3 className="font-semibold mb-2">خدمات</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.services.split(',').map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-sm"
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
