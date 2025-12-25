
import React, { useState } from 'react';
import { Service } from '../types';
import { parseDocxServices } from '../services/docxService';
import { Icons } from '../constants';

interface ServiceListProps {
  services: Service[];
  setServices: (services: Service[]) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, setServices }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const newServices = await parseDocxServices(file);
      setServices(newServices);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse file");
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-playfair text-[#D4AF37] mb-2">Our Services</h1>
          <p className="text-gray-400">Meticulously curated grooming experiences.</p>
        </div>
        
        <div className="relative group">
          <input
            type="file"
            accept=".docx"
            onChange={handleFileUpload}
            id="docx-upload"
            className="hidden"
          />
          <label
            htmlFor="docx-upload"
            className={`flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] border border-[#262626] rounded-full cursor-pointer hover:border-[#D4AF37] transition-all ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <div className="text-[#D4AF37]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <span className="font-medium text-sm">Update Services (DOCX)</span>
          </label>
          {isUploading && (
            <div className="absolute top-full left-0 mt-2 text-xs text-[#D4AF37] animate-pulse">
              Analyzing services...
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-4 rounded-2xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-[#121212] p-8 rounded-3xl border border-[#262626] flex justify-between group hover:border-[#D4AF37] transition-all duration-300">
            <div className="space-y-2">
              <h3 className="text-2xl font-playfair group-hover:text-[#D4AF37] transition-colors">{service.name}</h3>
              <p className="text-gray-400 text-sm max-w-xs">{service.description}</p>
              <div className="flex items-center gap-4 pt-2">
                <span className="flex items-center gap-1 text-xs text-gray-500 uppercase tracking-widest">
                  <Icons.Clock /> {service.duration || '45 min'}
                </span>
              </div>
            </div>
            <div className="text-right flex flex-col justify-between">
              <span className="text-2xl font-playfair text-[#D4AF37]">{service.price}</span>
              <button className="text-[10px] uppercase tracking-widest border border-[#262626] px-3 py-1 rounded-full text-gray-500 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-all">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-20 bg-[#121212] rounded-3xl border border-[#262626] border-dashed">
          <p className="text-gray-500 mb-4">No services listed yet.</p>
          <p className="text-sm text-gray-600">Upload a DOCX file with a service table to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ServiceList;
