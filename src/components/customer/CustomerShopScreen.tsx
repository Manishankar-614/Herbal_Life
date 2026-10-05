'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StoreItem } from '../../types';
import { 
  ShoppingBag, 
  Video, 
  Sparkles, 
  Star, 
  Check, 
  Clock, 
  Calendar, 
  ChevronRight, 
  X, 
  ShieldCheck, 
  Gift, 
  Truck, 
  ArrowLeft,
  Filter,
  CreditCard,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';

export const CustomerShopScreen: React.FC = () => {
  const { 
    coach, 
    storeItems, 
    purchaseStoreItem, 
    customerXp, 
    setCustomerTab,
    showNotification 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow, 4:00 PM');
  const [consultNotes, setConsultNotes] = useState('');
  const [useVoucher, setUseVoucher] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const filteredItems = activeCategory === 'all'
    ? storeItems
    : storeItems.filter(item => {
        if (activeCategory === 'consultations') return item.category === 'Consultations';
        if (activeCategory === 'supplements') return item.category === 'Products';
        if (activeCategory === 'packages') return item.category === 'Packages' || item.category === 'Memberships';
        return true;
      });

  const handleOpenCheckout = (item: StoreItem) => {
    setSelectedItem(item);
    setUseVoucher(false);
    setPaymentSuccess(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmPurchase = () => {
    if (!selectedItem) return;
    
    purchaseStoreItem(selectedItem.id, {
      slot: selectedSlot,
      notes: consultNotes,
      address: 'B-402, Green Glen Layout, Bellandur, Bengaluru 560103'
    });

    setPaymentSuccess(true);
  };

  const voucherDiscount = useVoucher ? 250 : 0;
  const finalPrice = selectedItem ? Math.max(0, selectedItem.price - voucherDiscount) : 0;

  return (
    <div className="p-4 space-y-4 pb-12 font-sans">
      {/* Top Header with Back Button */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setCustomerTab('home')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
          <span>Back</span>
        </button>

        {/* Voucher Badge */}
        <button
          onClick={() => showNotification("You have 1 active ₹250 referral reward voucher applicable on checkout!", "info")}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold shadow-2xs"
        >
          <Gift className="w-3.5 h-3.5 text-amber-600" />
          <span>₹250 Voucher</span>
        </button>
      </div>

      {/* Coach Store Brand Strip */}
      <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs">
        <div 
          className="w-10 h-10 rounded-full overflow-hidden border-2 shadow-xs shrink-0"
          style={{ borderColor: 'var(--brand-primary)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-slate-500">{coach.businessName}</span>
            <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
              Verified
            </span>
          </div>
          <h1 className="text-sm font-extrabold text-slate-900 leading-tight">
            Coach Store & 1:1 Consultations
          </h1>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <div 
        className="rounded-3xl p-4 text-white shadow-lg relative overflow-hidden space-y-2"
        style={{
          background: `linear-gradient(135deg, var(--brand-primary) 0%, #0F172A 100%)`
        }}
      >
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
            Curated by {coach.name}
          </span>
          <h2 className="text-base font-black mt-1">Direct Products & Private Syncs</h2>
          <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
            All supplements, herbal detox infusions, and 1:1 strategy calls are personally tested and managed by your coach.
          </p>
        </div>

        <div className="relative z-10 pt-1 flex items-center gap-3 text-[10px] text-emerald-200 font-semibold">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine
          </span>
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" /> 2-Day Delivery
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> +150 XP per Order
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {[
          { id: 'all', label: 'All Items' },
          { id: 'consultations', label: '1:1 Consults 🎥' },
          { id: 'supplements', label: 'Nutrition & Herbs 🌿' },
          { id: 'packages', label: 'VIP Packages 💎' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all",
              activeCategory === tab.id
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products & Consultations Grid */}
      <div className="space-y-3.5">
        {filteredItems.map((item) => {
          const isConsultation = item.category === 'Consultations' || item.ctaType === 'Book Consultation';

          return (
            <div
              key={item.id}
              className={cn(
                "bg-white rounded-3xl border shadow-xs overflow-hidden transition-all group flex flex-col sm:flex-row",
                item.isCoachDirect ? "border-emerald-200 ring-1 ring-emerald-500/10" : "border-slate-200/80"
              )}
            >
              {/* Product Photo */}
              <div className="w-full sm:w-36 h-40 sm:h-auto bg-slate-100 relative shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-md">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>

                {isConsultation && (
                  <div className="absolute bottom-2 left-2 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    <span>Live Video</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                      {item.soldCount !== undefined && (
                        <span className="text-slate-400 font-normal text-[10px]">({item.soldCount} bought)</span>
                      )}
                    </div>
                    {item.duration && (
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.duration}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-black text-slate-900 leading-tight">
                    {item.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-sm font-black text-slate-900">{formatINR(item.price)}</span>
                    {item.originalPrice && (
                      <span className="text-[11px] text-slate-400 line-through ml-1.5">
                        {formatINR(item.originalPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenCheckout(item)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-xs font-black shadow-xs transition-transform active:scale-95 flex items-center gap-1.5",
                      isConsultation
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    )}
                  >
                    {isConsultation ? (
                      <>
                        <Video className="w-3.5 h-3.5" />
                        <span>Book Call</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Buy Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Checkout / Booking Modal */}
      {isCheckoutOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  {selectedItem.category === 'Consultations' ? (
                    <Video className="w-4 h-4" />
                  ) : (
                    <ShoppingBag className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h3 className="text-xs font-black text-white">
                    {selectedItem.category === 'Consultations' ? 'Confirm 1:1 Consultation' : 'Checkout & Order'}
                  </h3>
                  <p className="text-[10px] text-slate-300">Managed directly by {coach.name}</p>
                </div>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            {!paymentSuccess ? (
              <div className="p-5 overflow-y-auto space-y-4 text-xs">
                {/* Item Summary */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedItem.image} alt={selectedItem.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-xs truncate">{selectedItem.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {selectedItem.duration ? `⏱ ${selectedItem.duration} Video Sync` : 'Physical Dispatch · Direct by Coach'}
                    </p>
                    <div className="font-black text-slate-900 mt-1">{formatINR(selectedItem.price)}</div>
                  </div>
                </div>

                {/* Consultation Slots Selection */}
                {selectedItem.category === 'Consultations' && (
                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
                      Select Preferred Date & Time Slot
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Tomorrow, 4:00 PM',
                        'Tomorrow, 7:30 PM',
                        'Thursday, 11:00 AM',
                        'Friday, 5:00 PM'
                      ].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={cn(
                            "p-2.5 rounded-xl border text-left text-[11px] font-bold transition-all",
                            selectedSlot === slot
                              ? "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50"
                          )}
                        >
                          <Clock className="w-3 h-3 inline mr-1 text-emerald-600" />
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-1">
                      <label className="font-bold text-slate-700 block mb-1 text-[11px]">
                        Topics to discuss (optional)
                      </label>
                      <input
                        type="text"
                        value={consultNotes}
                        onChange={(e) => setConsultNotes(e.target.value)}
                        placeholder="e.g. Review recent blood reports & diet plateau"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Delivery Address (for physical items) */}
                {selectedItem.category !== 'Consultations' && (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-slate-500" /> Deliver to Saved Address
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold">Default</span>
                    </div>
                    <div className="font-bold text-slate-800 text-xs">Rohan Deshpande</div>
                    <div className="text-[11px] text-slate-500 leading-tight">
                      B-402, Green Glen Layout, Bellandur, Bengaluru 560103
                    </div>
                  </div>
                )}

                {/* Voucher Toggle */}
                <div 
                  onClick={() => setUseVoucher(!useVoucher)}
                  className={cn(
                    "p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all",
                    useVoucher ? "bg-amber-50 border-amber-300" : "bg-slate-50 border-slate-200"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Apply Referral Reward Voucher</div>
                      <div className="text-[10px] text-slate-500">Save ₹250 on this order</div>
                    </div>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center border",
                    useVoucher ? "bg-amber-500 border-amber-600 text-slate-950 font-bold" : "border-slate-300"
                  )}>
                    {useVoucher && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
                  <div className="flex justify-between text-slate-600">
                    <span>Item Subtotal</span>
                    <span>{formatINR(selectedItem.price)}</span>
                  </div>
                  {useVoucher && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Referral Voucher Applied</span>
                      <span>-₹250</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-100">
                    <span>Total Payable</span>
                    <span>{formatINR(finalPrice)}</span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={handleConfirmPurchase}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay {formatINR(finalPrice)} via UPI / Card</span>
                </button>
              </div>
            ) : (
              /* Success Confirmation */
              <div className="p-6 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900">Order Confirmed!</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                    {selectedItem.category === 'Consultations'
                      ? `Your 1:1 call with ${coach.name} is booked for ${selectedSlot}. Google Meet link sent to your WhatsApp!`
                      : `Your order for ${selectedItem.name} has been dispatched. Estimated delivery in 48 hours.`}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>+150 XP Awarded to your profile!</span>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Done & Back to Store
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
