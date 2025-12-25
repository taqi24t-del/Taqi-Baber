
import React, { useState } from 'react';
import { Service, Appointment } from '../types';
import { BUSINESS_HOURS, Icons } from '../constants';

interface CalendarViewProps {
  appointments: Appointment[];
  services: Service[];
  onBook: (app: Appointment) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ appointments, services, onBook }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate slots
  const generateSlots = () => {
    const slots = [];
    for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const slots = generateSlots();

  const handleBook = () => {
    if (!selectedTime || !customerName || !mobileNumber || !selectedServiceId) {
      alert("Please fill all fields");
      return;
    }

    const service = services.find(s => s.id === selectedServiceId);
    const newApp: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      customerName,
      mobileNumber,
      serviceId: selectedServiceId,
      serviceName: service?.name || "Service",
      date: selectedDate,
      time: selectedTime
    };

    onBook(newApp);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedTime(null);
      setCustomerName('');
      setMobileNumber('');
    }, 3000);
  };

  const isSlotBooked = (time: string) => {
    return appointments.some(a => a.date === selectedDate && a.time === time);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-bounce">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-black mb-4">
          <Icons.Check />
        </div>
        <h2 className="text-3xl font-playfair mb-2">Booking Confirmed!</h2>
        <p className="text-gray-400">We'll see you on {selectedDate} at {selectedTime}.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-[#121212] p-6 rounded-3xl border border-[#262626]">
          <h2 className="text-2xl font-playfair mb-6 flex items-center gap-2">
            <Icons.Calendar /> Select Date & Time
          </h2>
          <div className="flex flex-wrap gap-4 mb-8">
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-[#1a1a1a] text-white border border-[#262626] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {slots.map((time) => {
              const booked = isSlotBooked(time);
              const selected = selectedTime === time;
              return (
                <button
                  key={time}
                  disabled={booked}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-2 rounded-xl text-sm font-medium transition-all transform active:scale-95 ${
                    booked 
                      ? 'bg-[#1a1a1a] text-gray-700 cursor-not-allowed border border-transparent' 
                      : selected
                      ? 'bg-[#D4AF37] text-black scale-105 shadow-lg border-transparent'
                      : 'bg-[#1a1a1a] text-gray-300 border border-[#262626] hover:border-[#D4AF37]'
                  }`}
                >
                  {time}
                  {booked && <span className="block text-[8px] uppercase">Booked</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-[#121212] p-6 rounded-3xl border border-[#262626] sticky top-24">
          <h2 className="text-2xl font-playfair mb-6">Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2 tracking-widest">Select Service</label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white border border-[#262626] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
              >
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.price})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2 tracking-widest">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white border border-[#262626] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2 tracking-widest">Mobile Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white border border-[#262626] rounded-xl px-4 py-3 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="pt-4">
              <div className="bg-[#1a1a1a] p-4 rounded-2xl mb-6 border border-dashed border-[#262626]">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Slot:</span>
                  <span className="text-[#D4AF37] font-bold">{selectedTime || 'Not selected'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-white">{selectedDate}</span>
                </div>
              </div>
              <button
                disabled={!selectedTime || !customerName || !mobileNumber}
                onClick={handleBook}
                className="w-full bg-[#D4AF37] text-black py-4 rounded-2xl font-bold hover:bg-[#facc15] transition-all disabled:opacity-30 active:scale-95 flex items-center justify-center gap-2"
              >
                <Icons.Check /> Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
