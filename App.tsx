
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import { TabType, Service, Appointment } from './types';
import { COLORS } from './constants';
import ChatAssistant from './components/ChatAssistant';
import CalendarView from './components/CalendarView';
import ServiceList from './components/ServiceList';
import Settings from './components/Settings';

const INITIAL_SERVICES: Service[] = [
  { id: '1', name: 'Classic Haircut', description: 'Traditional cut with hot towel finish.', price: '₹350', duration: '45 min' },
  { id: '2', name: 'Beard Grooming', description: 'Trimming, shaping and beard oil application.', price: '₹200', duration: '30 min' },
  { id: '3', name: 'Royal Combo', description: 'Full haircut and beard styling.', price: '₹500', duration: '75 min' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('barber_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('barber_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('barber_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('barber_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (newApp: Appointment) => {
    setAppointments(prev => [...prev, newApp]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="relative h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/barber1/1200/800" 
                alt="Barbershop" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8">
                <h1 className="text-4xl md:text-6xl font-playfair mb-4 text-[#D4AF37]">Excellence in Grooming</h1>
                <p className="text-lg text-gray-300 max-w-xl mb-6">Experience the finest craftsmanship in the city. Our AI concierge is ready to find your perfect slot.</p>
                <button 
                  onClick={() => setActiveTab('calendar')}
                  className="bg-[#D4AF37] text-black px-8 py-3 rounded-full font-bold w-fit hover:bg-[#facc15] transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Book Appointment
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#121212] p-8 rounded-3xl border border-[#262626]">
                <h3 className="text-[#D4AF37] font-playfair text-2xl mb-4">Precision</h3>
                <p className="text-gray-400">Every cut is treated as a masterpiece. We don't just cut hair; we sculpt confidence.</p>
              </div>
              <div className="bg-[#121212] p-8 rounded-3xl border border-[#262626]">
                <h3 className="text-[#D4AF37] font-playfair text-2xl mb-4">AI Concierge</h3>
                <p className="text-gray-400">Our intelligent assistant learns your style and manages your time efficiently.</p>
              </div>
              <div className="bg-[#121212] p-8 rounded-3xl border border-[#262626]">
                <h3 className="text-[#D4AF37] font-playfair text-2xl mb-4">Pure Luxury</h3>
                <p className="text-gray-400">Premium products and a serene atmosphere designed for the modern gentleman.</p>
              </div>
            </div>
          </div>
        );
      case 'ai':
        return <ChatAssistant services={services} appointments={appointments} />;
      case 'calendar':
        return <CalendarView appointments={appointments} services={services} onBook={addAppointment} />;
      case 'services':
        return <ServiceList services={services} setServices={setServices} />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8 md:pt-20 bg-[#0a0a0a]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-6xl mx-auto px-4 pt-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
