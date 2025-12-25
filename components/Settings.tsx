
import React, { useState } from 'react';
import { Icons, COLORS } from '../constants';

const Settings: React.FC = () => {
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleSave = () => {
    setSaveStatus('Preferences saved successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-playfair text-[#D4AF37]">Management</h1>
        <p className="text-gray-400">Configure your shop and AI preferences.</p>
      </div>

      <div className="bg-[#121212] rounded-3xl border border-[#262626] divide-y divide-[#262626]">
        <div className="p-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Icons.Scissors /> Business Identity
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2 tracking-widest">Shop Name</label>
              <input 
                type="text" 
                defaultValue="BarberFlow AI" 
                className="w-full bg-[#1a1a1a] text-white border border-[#262626] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2 tracking-widest">Address</label>
              <input 
                type="text" 
                defaultValue="123 Luxury Lane, Grooming District" 
                className="w-full bg-[#1a1a1a] text-white border border-[#262626] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Icons.Settings /> AI System Configuration
          </h3>
          <div className="bg-[#1a1a1a] p-4 rounded-2xl flex items-center justify-between border border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm">Gemini Flash Connection Active</span>
            </div>
            <span className="text-[10px] text-gray-500 uppercase">Latency: 142ms</span>
          </div>
          <p className="text-sm text-gray-400">
            The AI assistant is automatically configured using your environment variables. 
            No manual API key management is required for this deployment.
          </p>
        </div>

        <div className="p-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Icons.Calendar /> Operational Hours
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2 tracking-widest">Opens</label>
              <input 
                type="time" 
                defaultValue="09:00" 
                className="w-full bg-[#1a1a1a] text-white border border-[#262626] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2 tracking-widest">Closes</label>
              <input 
                type="time" 
                defaultValue="19:00" 
                className="w-full bg-[#1a1a1a] text-white border border-[#262626] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        {saveStatus && (
          <div className="text-green-500 text-sm animate-bounce">
            {saveStatus}
          </div>
        )}
        <button 
          onClick={handleSave}
          className="bg-[#D4AF37] text-black px-12 py-4 rounded-full font-bold hover:bg-[#facc15] transition-all transform active:scale-95 shadow-xl"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
