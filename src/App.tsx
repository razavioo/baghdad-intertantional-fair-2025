import React, { useState } from 'react';
import { Grid, List } from 'lucide-react';
import { CompanyCard } from './components/CompanyCard';
import { CompanyModal } from './components/CompanyModal';
import { FiltersPanel } from './components/Filters';
import { CompanyMap } from './components/CompanyMap';
import { Company, Filters } from './types/company';

// Actual company data
const mockCompanies: Company[] = JSON.parse(`
[
  {
    "type": 3,
    "halls": ["H17"],
    "points": "4938155.8746654,3936903.4157866 4938153.7710113,3936900.0136344 4938156.3226254,3936898.4358939 4938158.4262795,3936901.838046",
    "description": "شرکت تولید عسل طبیعی گلها",
    "decor": "1",
    "area": "15",
    "id": "10601",
    "countryShort": "ir",
    "categoryShort": "agri",
    "tel": "+989123456789",
    "email": "info@golha.com",
    "golden": "1",
    "request": "12345",
    "contact": "رضا محمدی",
     "services": "تولید",
    "products": "عسل طبیعی، موم",
     "address": "تهران، خیابان انقلاب"
  },
  {
    "type": 3,
    "halls": ["H05"],
    "points": "4938451.6328008,3936964.0479736 4938452.9806531,3936958.2013255",
    "description": "Al Baraka Plastic Factory",
    "decor": "0",
    "area": "48",
    "id": "9520",
    "countryShort": "iq",
    "categoryShort": "plastic",
    "tel": "07809932339",
    "email": "wameedh.monther@brk-iq.com",
    "golden": "0",
    "request": "9520",
    "contact": "محمد عبدالامیر جرحی",
      "services": "تولید",
    "products": "انواع پلاستیک",
      "address": "بغداد الزعفرانية"
  },
  {
    "type": 3,
    "halls": ["H17"],
    "points": "4938105.9551187,3936923.1648644 4938109.1105998,3936928.2680926 4938111.662214,3936926.690352 4938108.5067328,3936921.5871238",
    "description": "SARA KATOON",
    "decor": "0",
    "area": "18",
    "id": "9088",
    "countryShort": "iq",
    "categoryShort": "clothes",
    "tel": "07735375563",
    "email": "sara234@gmail.com",
    "golden": "0",
    "request": "9088",
    "contact": "علي صباح محمد",
      "services": "خرده فروشی",
    "products": "حجابات",
       "address": "كربلاء حي العباس"
  },
  {
    "type": 3,
      "halls": ["H89"],
    "points": "4938332.2466778,3937055.7653632 4938330.0903521,3937065.530109 4938316.4197081,3937062.511253 4938318.5760338,3937052.7465073",
    "description": "AL-Sadeq Group",
    "decor": "1",
    "area": "140",
    "id": "9154",
    "countryShort": "jp",
    "categoryShort": "car",
    "tel": "07744006622",
    "email": "khaled.sabah@alsadeq-group.com",
    "golden": "0",
    "request": "9154",
    "contact": "خالد",
      "services": "فروش",
    "products": "سیارات",
       "address": "بغداد الجادرية"
  },
    {
        "type": 3,
        "halls": [
          "H18"
        ],
        "points": "4938230.6900625,3936852.5282091 4938244.0661922,3936843.7487356 4938240.7738896,3936838.732687 4938227.3977599,3936847.5121605",
        "description": "Ministry of justice",
        "decor": "0",
        "area": "96",
        "id": "9084",
        "countryShort": "iqp",
        "categoryShort": "handcrafts",
        "tel": "07737835324",
        "email": "ics200875@moj.gov.iq",
        "golden": "0",
        "request": "9084",
        "contact": "محمد نوري عباس",
        "services": "خدمات",
        "products": "اعمال يدوية",
        "address": "بغداد/ قرب ملعب الشعب"
    },
  {
    "type": 3,
    "halls": ["H17"],
    "points": "4938147.6206364,3936915.5738618 4938146.0428958,3936913.0222477 4938148.5945099,3936911.4445071 4938150.1722505,3936913.9961212",
    "description": "EGY COT",
    "decor": "0",
    "area": "9",
    "id": "9058",
    "countryShort": "eg",
    "categoryShort": "clothes",
    "tel": "009647811599555",
    "email": "nagmalzahwy.gmail.com",
    "golden": "0",
    "request": "9058",
    "contact": "محمد عامر",
      "services": "خرده فروشی",
    "products": "ملابس",
    "address": "مصر كرداسة"
  },
    {
        "type": 3,
        "halls": [
          "H18"
        ],
        "points": "4938206.4975573,3936861.2300878 4938212.349614,3936857.3890682 4938215.6419166,3936862.4051168 4938209.7898599,3936866.2461365",
        "description": "zaincash",
        "decor": "1",
        "area": "42",
        "id": "9030",
        "countryShort": "iq",
        "categoryShort": "oth",
        "tel": "07849861232",
        "email": "ahmed.haidai@zaincash.iq",
        "golden": "0",
        "request": "9030",
        "contact": "احمد حيدر",
      "services": "خدمات",
      "products": "خدمات ",
        "address": "بغداد/ حي الجامعة"
      },
  {
    "type": 3,
    "halls": ["H03"],
    "points": "4938387.1954243,3937086.7557501 4938386.0504889,3937091.6228974 4938400.6519307,3937095.0577037 4938401.7968662,3937090.1905564",
    "description": "Fayd Al Qaseem company",
    "decor": "1",
    "area": "75",
    "id": "9019",
    "countryShort": "iqp",
    "categoryShort": "food",
    "tel": "07717181975",
    "email": "info@faydalqassim.com",
    "golden": "0",
    "request": "9019",
    "contact": "علي فرحان الشمري ",
     "services": "تجاری",
    "products": "مواد غذائية وتمور ",
    "address": "النجف الاشرف / الحنانة "
  },
  {
    "type": 3,
      "halls": ["H17"],
    "points": "4938153.6885897,3936882.767258 4938156.2402038,3936881.1895174 4938158.343858,3936884.5916696 4938155.7922438,3936886.1694102",
    "description": "Al wadi meat industries",
    "decor": "1",
    "area": "12",
    "id": "9027",
    "countryShort": "jo",
    "categoryShort": "food",
    "tel": "07809277583",
    "email": "info@bg-iq.net",
    "golden": "0",
    "request": "9027",
    "contact": "اكرم عباس محسن",
       "services": "صنعتی",
    "products": "مصنعات لحوم",
    "address": "بغداد شهداء البياع الشارع العام"
  },
    {
        "type": 3,
        "halls": ["H17"],
        "points": "4938139.361927,3936913.6261147 4938137.2582729,3936910.2239625 4938139.809887,3936908.646222 4938141.9135411,3936912.0483741",
        "description": "KNUZ",
        "decor": "0",
        "area": "12",
        "id": "9056",
        "countryShort": "bh",
        "categoryShort": "clothes",
        "tel": "0097339900022",
        "email": "nagmalzahwy.gmail.com",
        "golden": "0",
        "request": "9056",
        "contact": "سعدية السيد ابراهيم ",
       "services": "خرده فروشی",
        "products": "ملابس",
         "address": "مملكة البحرين"
    },
  {
    "type": 3,
    "halls": ["H"],
    "points": null,
    "description": "ZINE ",
    "decor": "1",
    "area": "0",
    "id": "9015",
    "countryShort": "iqf",
    "categoryShort": "en",
    "tel": "07713978917",
    "email": "nagmalzahwy.gmail.com",
    "golden": "0",
    "request": "9015",
    "contact": "مصطفى حامد عبد السيد",
       "services": "تجاری",
    "products": "سخانات ",
      "address": "كرادة خارج"
  },
   {
        "type": 3,
      "halls": ["H02"],
        "points": "4938173.8969573,3937155.2610381 4938176.873768,3937154.8887508 4938177.2460553,3937157.8655615 4938174.2692445,3937158.2378488",
        "description": "The Specialty Hospital",
        "decor": "1",
        "area": "9",
        "id": "9250",
        "countryShort": "jo",
        "categoryShort": "med",
        "tel": "962793666111",
        "email": "info@specialty-hospital.com",
        "golden": "0",
        "request": "9250",
        "contact": "bg",
          "services": "تجاری",
        "products": "طبی",
           "address": "الاردن / عمان "
      },
 {
    "type": 3,
      "halls": ["H07"],
        "points": "4938304.8798174,3936999.0227151 4938307.7914675,3936999.745414 4938307.0687686,3937002.6570641 4938304.1571185,3937001.9343653",
        "description": "IRAN PAVILION / GHAFFARI CHEMICAL INDUSTRIES",
        "decor": "1",
        "area": "9",
        "id": "9394",
        "countryShort": "ir",
        "categoryShort": "oth",
        "tel": "+982166802560",
        "email": "MARKETIG@GHAFFARI.CO",
        "golden": "0",
        "request": "9394",
        "contact": "MR.BAHMAN KARIMI",
          "services": "تولید",
        "products": "مواد شیمیایی",
       "address": "NO 6, FATH ST, OLD KARAJ ROAD TEHRAN"
    },
   {
     "type": 3,
     "halls": ["H"],
    "points": null,
    "description": "Ali Baba Nuts",
    "decor": "1",
    "area": "0",
    "id": "9230",
    "countryShort": "iq",
    "categoryShort": "food",
    "tel": "07709999889",
    "email": "",
    "golden": "0",
    "request": "9230",
    "contact": "حيدر صاحب القاموسي",
     "services": "تولید",
    "products": "",
       "address": "العراق - بغداد"
  },
    {
    "type": 3,
    "halls": ["H18"],
    "points": "4938213.0821624,3936871.2621851 4938211.4360111,3936868.7541608 4938213.9440355,3936867.1080095 4938215.5901867,3936869.6160338",
    "description": "ALWAN ALBIHAR CO",
    "decor": "1",
    "area": "9",
    "id": "9175",
    "countryShort": "iq",
    "categoryShort": "cnd",
    "tel": "07703430011",
    "email": null,
    "golden": "0",
    "request": "9175",
    "contact": "منير حازم",
      "services": "خرده فروشی",
    "products": "مواد بناء ",
      "address": "بغداد جرف النداف "
  },
    {
        "type": 3,
        "halls": ["H05"],
    "points": "4938448.5054177,3936976.6682701 4938452.4031831,3936977.5668383 4938451.729257,3936980.4901623 4938447.8314916,3936979.5915942",
        "description": "al malwiya factory",
        "decor": "1",
        "area": "12",
        "id": "9515",
        "countryShort": "iq",
        "categoryShort": "food",
        "tel": "07717634511",
        "email": "malwiyaspicos@gmail.com",
        "golden": "0",
        "request": "9515",
        "contact": "صالح ",
          "services": "تولید",
        "products": null,
           "address": "بغداد / حي الوحدة"
    },
 {
    "type": 3,
      "halls": ["H"],
        "points": null,
        "description": "General Company for Trading Automotive and Equipment",
        "decor": "1",
        "area": "0",
        "id": "9095",
        "countryShort": "iq",
        "categoryShort": "car",
        "tel": "07712295600",
        "email": "Noor.ali@alsadeq-group.com",
        "golden": "0",
        "request": "9095",
        "contact": "نور علي كريم",
          "services": "فروش",
        "products": "سيارات ومعدات",
           "address": "العراق الجادرية"
      },
  {
    "type": 3,
    "halls": ["H18"],
    "points": "4938216.5813844,3936847.4345657 4938211.5653358,3936850.7268683 4938213.2114871,3936853.2348926 4938218.2275357,3936849.94259",
    "description": "MINISTRY OF COMMUNICATIONS",
    "decor": "1",
    "area": "18",
    "id": "9181",
    "countryShort": "iqp",
    "categoryShort": "tech",
    "tel": "07718140555",
    "email": "marketing@moc.gov.iq",
    "golden": "0",
    "request": "9181",
    "contact": "رجاء حسين حمود",
       "services": "خدمات",
    "products": "بروشورات اتصالاات",
      "address": "بغداد - المنصور"
  },
  {
        "type": 3,
      "halls": ["H17"],
        "points": "4938137.6238114,3936887.9976934 4938140.1754255,3936886.4199528 4938142.2790796,3936889.8221049 4938139.7274655,3936891.3998455",
        "description": "Al-Batreeq",
        "decor": "1",
        "area": "12",
        "id": "9195",
        "countryShort": "iq",
        "categoryShort": "food",
        "tel": "+964 770 426 5224",
        "email": "sales@albatreeqco.com",
        "golden": "0",
        "request": "9195",
        "contact": "bg",
          "services": "تجاری",
        "products": "مواد غذائية ",
         "address": "بغداد "
    },
    {
    "type": 3,
      "halls": ["H17"],
        "points": "4938150.1722505,3936913.9961212 4938155.2754788,3936910.8406401 4938153.6977382,3936908.2890259 4938148.5945099,3936911.4445071",
    "description": "ABO AMIR",
    "decor": "0",
    "area": "18",
    "id": "9057",
    "countryShort": "eg",
    "categoryShort": "clothes",
    "tel": "00201097011908",
    "email": "nagmalzahwy.gmail.com",
    "golden": "0",
    "request": "9057",
    "contact": "محمد عامر",
      "services": "تجاری",
    "products": "ملابس",
    "address": "مصر كرداسة"
  },
  {
    "type": 3,
      "halls": ["H18"],
    "points": "4938229.983379,3936835.0496337 4938231.6295303,3936837.557658 4938237.481587,3936833.7166384 4938235.8354358,3936831.208614",
    "description": "shopping Center",
    "decor": "1",
    "area": "21",
    "id": "9112",
    "countryShort": "iqp",
    "categoryShort": "oth",
    "tel": "07718483211",
    "email": "marketingscc@mot.gov.iq",
    "golden": "0",
    "request": "9112",
    "contact": "سراب عبدالجليل",
       "services": "تجاری",
    "products": "مواد متنوعة",
        "address": "بغداد - ساحة التحريات"
    },
    {
    "type": 3,
    "halls": ["H17"],
    "points": "4938112.1900916,3936921.0214756 4938116.3973998,3936927.8257799 4938118.949014,3936926.2480394 4938114.7417057,3936919.443735",
    "description": "ALI AL Kanani Antiques",
    "decor": "0",
    "area": "24",
    "id": "8996",
    "countryShort": "iq",
    "categoryShort": "tools",
    "tel": "07807242704",
    "email": "nagmalzahwy.gmail.com",
    "golden": "0",
    "request": "8996",
    "contact": "علي عبد السادة محسن",
     "services": "تجاری",
    "products": "تحفيات",
    "address": "كربلاء حي العباس"
  }
]`
);

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

  // Extract unique values for filters
  const categories = Array.from(new Set(mockCompanies.map(c => c.categoryShort)));
  const countries = Array.from(new Set(mockCompanies.map(c => c.countryShort)));
  const services = Array.from(new Set(mockCompanies.map(c => c.services?.split(',').map(s => s.trim()) || []))).flat();
  const products = Array.from(new Set(mockCompanies.flatMap(c => c.products?.split(',').map(p => p.trim()) || []))).flat();

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = filters.search
      ? company.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        company.contact.toLowerCase().includes(filters.search.toLowerCase())
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
          {/* Filters sidebar */}
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

          {/* Main content */}
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

            {/* Map view */}
            <div className="mb-6 h-[400px]">
              <CompanyMap companies={filteredCompanies} />
            </div>

            {/* Companies grid/list */}
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
