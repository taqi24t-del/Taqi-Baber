
import React, { useState, useRef, useEffect } from 'react';
import { GeminiAssistant } from '../services/geminiService';
import { Service, Appointment } from '../types';
import { COLORS, Icons } from '../constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatAssistantProps {
  services: Service[];
  appointments: Appointment[];
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ services, appointments }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Welcome to BarberFlow! I'm your virtual concierge. How can I help you look your best today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const assistantRef = useRef<GeminiAssistant | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    assistantRef.current = new GeminiAssistant();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    if (assistantRef.current) {
      const today = new Date().toISOString().split('T')[0];
      const response = await assistantRef.current.generateResponse(
        userMsg,
        services,
        appointments,
        today
      );
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[75vh] bg-[#121212] rounded-3xl border border-[#262626] overflow-hidden shadow-2xl">
      <div className="bg-[#1a1a1a] p-4 border-b border-[#262626] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold">
            AI
          </div>
          <div>
            <h2 className="font-bold">BarberFlow Concierge</h2>
            <p className="text-xs text-green-500">Always active</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              m.role === 'user' 
                ? 'bg-[#D4AF37] text-black rounded-tr-none' 
                : 'bg-[#262626] text-gray-200 rounded-tl-none'
            }`}>
              <p className="text-sm md:text-base leading-relaxed">{m.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#262626] p-4 rounded-2xl rounded-tl-none animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-[#1a1a1a] border-t border-[#262626]">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about services or availability..."
            className="flex-1 bg-[#0a0a0a] border border-[#262626] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-[#D4AF37] text-black p-3 rounded-xl hover:bg-[#facc15] disabled:opacity-50 transition-all active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
