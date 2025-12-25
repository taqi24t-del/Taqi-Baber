
export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  mobileNumber: string;
  serviceId: string;
  serviceName: string;
  date: string; // ISO string YYYY-MM-DD
  time: string; // HH:mm
}

export interface BusinessHours {
  start: string; // 09:00
  end: string;   // 19:00
}

export type TabType = 'home' | 'ai' | 'calendar' | 'services' | 'settings';
