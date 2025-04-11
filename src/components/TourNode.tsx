import React from 'react';
import { MapPin, DollarSign, List, Info } from 'lucide-react';
import { TourPlace } from '../types';

interface TourNodeProps {
  data: TourPlace;
}

export const TourNode: React.FC<TourNodeProps> = ({ data }) => {
  const mapUrl = `https://www.google.com/maps?q=${data.lattitude},${data.longitude}`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-80">
      {data.image && (
        <img
          src={data.image}
          alt={data.place}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-xl font-bold mb-2">{data.place}</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">{data.detailedaddress}</p>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          <p className="text-sm">Cost per person: {data.costperperson}</p>
        </div>
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4" />
          <p className="text-sm">{data.whythisplace}</p>
        </div>
        <div className="flex items-center gap-2">
          <List className="w-4 h-4" />
          <p className="text-sm">{data.todo}</p>
        </div>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 text-sm inline-flex items-center gap-1"
        >
          <MapPin className="w-4 h-4" /> Open in Maps
        </a>
      </div>
    </div>
  );
};