import React from 'react';
import { X, Printer, Download, CheckCircle2, Shield, QrCode } from 'lucide-react';

export default function ReceiptModal({ 
  isOpen, 
  onClose, 
  transaction 
}) {
  if (!isOpen || !transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-['Orbitron'] select-text text-white">
      <div className="relative w-full max-w-lg bg-[#0a0d14] border border-[#e5b96a]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(229,185,106,0.3)] space-y-6 max-h-[95vh] overflow-y-auto print:bg-white print:text-black print:border-none print:shadow-none">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4 print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-[#e5b96a]">
            <Shield size={16} />
            <span>OFFICIAL TRANSACTION RECEIPT</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrint} 
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white flex items-center gap-1.5 transition-all"
              title="Print Receipt"
            >
              <Printer size={14} />
              <span>PRINT</span>
            </button>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* RECEIPT PRINTABLE AREA */}
        <div className="space-y-6 text-left" id="printable-receipt">
          {/* Header Brand */}
          <div className="flex justify-between items-start border-b border-white/15 pb-4 print:border-black/20">
            <div>
              <div className="flex items-center gap-3">
                <img 
                  src="/img/logo.png" 
                  alt="H8X Logo" 
                  className="h-12 md:h-14 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(229,185,106,0.6)] print:filter-none" 
                />
                <span className="font-black text-xl tracking-widest text-white print:text-black">HORCRUX ARENA</span>
              </div>
              <p className="text-[10px] text-gray-400 font-['Inter'] mt-1 print:text-gray-600">
                Sports Complex Blvd, City Center • GSTIN: 33AAACH8029M1Z9
              </p>
            </div>

            <div className="text-right font-mono">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 print:bg-transparent print:text-green-700">
                {transaction.status}
              </span>
              <div className="text-[10px] text-gray-400 mt-1 print:text-gray-600">{transaction.date}</div>
            </div>
          </div>

          {/* Meta Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-black/60 p-4 rounded-2xl border border-white/10 print:bg-gray-100 print:text-black print:border-gray-300">
            <div>
              <span className="text-[9px] text-gray-400 print:text-gray-600 block">TRANSACTION ID:</span>
              <span className="font-bold text-[#e5b96a] print:text-black">{transaction.id}</span>
            </div>
            <div>
              <span className="text-[9px] text-gray-400 print:text-gray-600 block">PLAYER ID & NAME:</span>
              <span className="font-bold text-white print:text-black">{transaction.userId} ({transaction.userName || 'SRI SARAN'})</span>
            </div>
            {transaction.bookingId && (
              <div>
                <span className="text-[9px] text-gray-400 print:text-gray-600 block">BOOKING REF:</span>
                <span className="font-bold text-[#00f0ff] print:text-black">{transaction.bookingId}</span>
              </div>
            )}
            {transaction.cafeOrderId && (
              <div>
                <span className="text-[9px] text-gray-400 print:text-gray-600 block">CAFÉ ORDER REF:</span>
                <span className="font-bold text-[#ff9900] print:text-black">{transaction.cafeOrderId}</span>
              </div>
            )}
            <div>
              <span className="text-[9px] text-gray-400 print:text-gray-600 block">PAYMENT METHOD:</span>
              <span className="font-bold text-white print:text-black">{transaction.method}</span>
            </div>
            <div>
              <span className="text-[9px] text-gray-400 print:text-gray-600 block">SECURITY VERIFICATION:</span>
              <span className="text-xs text-[#00ff88] font-bold flex items-center gap-1 print:text-green-700">
                <CheckCircle2 size={12} /> VERIFIED TLS 256
              </span>
            </div>
          </div>

          {/* Itemized Specification */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-[10px] text-gray-400 print:text-gray-600 uppercase tracking-widest block">
              TRANSACTION BREAKDOWN
            </span>

            <div className="border border-white/10 rounded-2xl overflow-hidden print:border-gray-300">
              <table className="w-full text-left">
                <thead className="bg-black/80 text-[10px] text-gray-400 border-b border-white/10 print:bg-gray-200 print:text-black print:border-gray-300">
                  <tr>
                    <th className="p-3">DESCRIPTION</th>
                    <th className="p-3 text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 print:divide-gray-200">
                  {transaction.activityTitle && (
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-white print:text-black">
                        <div className="font-bold">{transaction.activityTitle}</div>
                        <div className="text-[10px] text-gray-400 font-['Inter'] print:text-gray-600">Arena Slot Booking</div>
                      </td>
                      <td className="p-3 text-right text-white font-bold print:text-black">
                        ₹{(transaction.subtotal - (transaction.cafeItems ? (transaction.subtotal > 1200 ? transaction.subtotal - 1200 : 0) : 0)).toLocaleString()}
                      </td>
                    </tr>
                  )}

                  {transaction.cafeItems && (
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-white print:text-black">
                        <div className="font-bold">H8X CAFÉ FUEL</div>
                        <div className="text-[10px] text-gray-400 font-['Inter'] print:text-gray-600">{transaction.cafeItems}</div>
                      </td>
                      <td className="p-3 text-right text-white font-bold print:text-black">
                        ₹{(transaction.cafeItems ? (transaction.subtotal > 1200 ? transaction.subtotal - 1200 : transaction.subtotal) : 0).toLocaleString()}
                      </td>
                    </tr>
                  )}

                  {!transaction.activityTitle && !transaction.cafeItems && (
                    <tr className="hover:bg-white/5">
                      <td className="p-3 text-white font-bold print:text-black">{transaction.description}</td>
                      <td className="p-3 text-right text-white font-bold print:text-black">₹{transaction.subtotal.toLocaleString()}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Calculations and Totals */}
            <div className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-1.5 print:bg-gray-50 print:border-gray-300">
              <div className="flex justify-between text-gray-400 print:text-gray-600">
                <span>SUBTOTAL:</span>
                <span>₹{transaction.subtotal.toLocaleString()}</span>
              </div>
              {transaction.discount > 0 && (
                <div className="flex justify-between text-[#00ff88] print:text-green-700">
                  <span>DISCOUNT APPLIED:</span>
                  <span>-₹{transaction.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400 print:text-gray-600">
                <span>GST (INCLUDED 18%):</span>
                <span>₹{Math.round(transaction.amount * 0.18 / 1.18).toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-center text-base font-black text-white print:text-black print:border-gray-300">
                <span>TOTAL PAID:</span>
                <span className="text-xl text-[#e5b96a] print:text-black">₹{transaction.amount.toLocaleString()}</span>
              </div>
            </div>

            {/* Loyalty Gains */}
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#00ff88]/10 to-[#e5b96a]/10 border border-[#00ff88]/30 rounded-xl print:border-gray-300 print:bg-gray-100">
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#00ff88] print:text-green-700">
                <span>+{transaction.xpEarned} PLAYER XP</span>
              </div>
              <div className="text-[11px] font-bold text-[#e5b96a] print:text-amber-800">
                +{transaction.rewardPointsEarned} REWARD POINTS
              </div>
            </div>

            {/* Receipt Footer with Security QR code */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400 font-mono print:text-gray-600 print:border-gray-300">
              <div>
                <p>This is a computer generated tax invoice.</p>
                <p>Digital Token: {transaction.id.replace('HXPAY-', 'AUTH-SHA256-')}</p>
              </div>
              <div className="flex items-center gap-1.5 text-white print:text-black">
                <QrCode size={24} />
                <span className="text-[8px]">H8X-VERIFIED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button (Hidden in Print) */}
        <div className="pt-2 border-t border-white/10 print:hidden">
          <button
            onClick={onClose}
            className="cyber-btn w-full py-3 text-xs bg-[#e5b96a] text-black border-[#e5b96a] font-black"
          >
            CLOSE RECEIPT
          </button>
        </div>

      </div>
    </div>
  );
}
