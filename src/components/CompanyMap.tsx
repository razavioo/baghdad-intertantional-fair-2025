import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { Company } from '../types/company';
import { parsePoints } from '../lib/utils';
import 'leaflet/dist/leaflet.css';

interface CompanyMapProps {
  companies: Company[];
  selectedCompany?: Company;
}

export function CompanyMap({ companies }: CompanyMapProps) {
  const validCompanies = companies.filter(
    (company) => company.points && parsePoints(company.points)
  );

  if (validCompanies.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">اطلاعات مکانی موجود نیست</p>
      </div>
    );
  }

  const firstCompany = validCompanies[0];
  const firstPoints = parsePoints(firstCompany.points);
  const center = firstPoints ? firstPoints[0] : [0, 0];

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={13}
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {validCompanies.map((company) => {
        const points = parsePoints(company.points);
        if (!points || points.length === 0) return null;

        return (
          <React.Fragment key={company.id}>
            <Marker position={points[0] as [number, number]}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{company.description}</h3>
                  <p className="text-sm text-gray-600">{company.address}</p>
                </div>
              </Popup>
            </Marker>
            {points.length > 2 && (
              <Polygon
                positions={points}
                pathOptions={{
                  color: company.golden === "1" ? '#F59E0B' : '#3B82F6',
                  fillColor: company.golden === "1" ? '#FCD34D' : '#93C5FD',
                  fillOpacity: 0.3,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}
