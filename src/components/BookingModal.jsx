import React, { useState } from 'react';
import { X, Calendar, Clock, Users, ArrowRight, Check } from 'lucide-react';

export default function BookingModal({ 
  isOpen, 
  onClose, 
  selectedActivity, 
  onBookingSuccess
}) {
  const [selectedDate, setSelectedDate] = useState('2026-09-24');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('18:00 PM');
  const [playersCount, setPlayersCount] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const activity = selectedActivity || {
    title: 'TURF',
    subtitle: 'ARENA ZONE',
    character: '/img/ch6.png',
    priceVal: 1800
  };

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
      if (onBookingSuccess) {
        onBookingSuccess({
          ticketId: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
          zone: activity.title,
          date: selectedDate,
          time: selectedTimeSlot,
          players: playersCount
        });
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080808]/70 backdrop-blur-lg font-editorial text-[#080808]">
      <div className="relative w-full max-w-4xl editorial-glass rounded-lg overflow-hidden shadow-2xl border border-black/15 bg-[#F2F3F5] grid lg:grid-cols-12">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 text-[#080808] hover:opacity-60 transition-opacity"
        >
          <X size={20} />
        </button>

        {/* LEFT 5 COLS: EDITORIAL IDENTITY & ARTWORK */}
        <div className="lg:col-span-5 bg-[#D9DCE1]/50 p-8 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-black/10">
          <div>
            <div className="text-[10px] font-mono-tech text-[#C59B27] tracking-[0.25em] uppercase font-bold">
              ZONE BOOKING DIRECTIVE
            </div>
            <h2 className="text-3xl font-black text-[#080808] uppercase leading-none mt-2">
              BOOK YOUR ZONE
            </h2>
            <div className="text-xs font-mono-tech text-[#555A64] mt-2 font-bold uppercase">
              {activity.title} — {activity.subtitle}
            </div>
          </div>

          <div className="my-6 relative flex items-center justify-center h-56">
            <img 
              src={activity.character || '/img/ch6.png'} 
              alt={activity.title}
              className="h-full object-contain filter drop-shadow-xl z-10"
            />
          </div>

          <div className="text-xs font-mono-tech text-[#555A64] border-t border-black/10 pt-4 flex justify-between">
            <span>RATE: ₹{activity.priceVal || 1800} / session</span>
            <span className="text-[#C59B27] font-bold">+150 XP</span>
          </div>
        </div>

        {/* RIGHT 7 COLS: EDITORIAL FORM / CONFIRMATION */}
        <div className="lg:col-span-7 p-8 flex flex-col justify-between space-y-6">
          
          {!isConfirmed ? (
            <>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-mono-tech text-[#555A64] tracking-widest uppercase block mb-2 font-bold">
                    01 // SELECT DATE
                  </label>
                  <input 
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 bg-white border border-black/15 rounded text-sm font-mono-tech font-bold focus:outline-none focus:border-[#C59B27]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono-tech text-[#555A64] tracking-widest uppercase block mb-2 font-bold">
                    02 // TIME SLOT
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['10:00 AM', '14:00 PM', '18:00 PM', '20:00 PM'].map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-2.5 text-xs font-mono-tech font-bold rounded border transition-all ${
                          selectedTimeSlot === slot
                            ? 'bg-[#080808] text-[#F2F3F5] border-[#080808]'
                            : 'bg-white border-black/15 text-[#555A64] hover:border-black/40'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono-tech text-[#555A64] tracking-widest uppercase block mb-2 font-bold">
                    03 // NUMBER OF PLAYERS
                  </label>
                  <div className="flex items-center gap-4">
                    {[1, 2, 4, 6].map((num) => (
                      <button
                        key={num}
                        onClick={() => setPlayersCount(num)}
                        className={`w-12 h-12 text-sm font-mono-tech font-bold rounded border transition-all ${
                          playersCount === num
                            ? 'bg-[#080808] text-[#F2F3F5] border-[#080808]'
                            : 'bg-white border-black/15 text-[#555A64] hover:border-black/40'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* TOTAL & CONFIRM */}
              <div className="pt-6 border-t border-black/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono-tech text-[#888] uppercase tracking-widest">TOTAL AMOUNT</div>
                  <div className="text-2xl font-black text-[#080808]">₹{(activity.priceVal || 1800) * playersCount}</div>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  disabled={isProcessing}
                  className="editorial-btn"
                >
                  {isProcessing ? 'CONFIRMING...' : 'CONFIRM BOOKING'}
                </button>
              </div>
            </>
          ) : (
            <div className="my-auto text-center space-y-4 py-8">
              <div className="w-16 h-16 rounded-full bg-[#C59B27]/20 border border-[#C59B27] flex items-center justify-center mx-auto text-[#C59B27]">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-black text-[#080808] uppercase">RESERVATION CONFIRMED</h3>
              <p className="text-sm font-body text-[#555A64] max-w-sm mx-auto">
                Your entry pass for {activity.title} has been logged in your Player Dossier.
              </p>
              <button
                onClick={onClose}
                className="editorial-btn mt-4"
              >
                CLOSE WINDOW
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
