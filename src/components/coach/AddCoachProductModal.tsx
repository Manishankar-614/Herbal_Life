'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StoreItem } from '../../types';
import { 
  X, 
  Sparkles, 
  Video, 
  ShoppingBag, 
  Package, 
  Clock, 
  IndianRupee, 
  Check, 
  Image as ImageIcon,
  Tag,
  ShieldCheck,
  TrendingUp,
  Info
} from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';

interface AddCoachProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_PHOTOS = [
  { label: 'Consultation Call', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
  { label: 'Doctor / Lab Audit', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80' },
  { label: 'Herbal Tea / Detox', url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80' },
  { label: 'Protein & Shaker', url: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80' },
  { label: 'Supplements / Caps', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80' },
  { label: 'Fitness Bands & Gear', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
];

export const AddCoachProductModal: React.FC<AddCoachProductModalProps> = ({ isOpen, onClose }) => {
  const { addStoreItem, coach } = useApp();

  const [offeringType, setOfferingType] = useState<'consultation' | 'product' | 'package'>('consultation');
  const [name, setName] = useState('1:1 Personal Transformation Deep Dive');
  const [category, setCategory] = useState<'Consultations' | 'Products' | 'Packages'>('Consultations');
  const [price, setPrice] = useState('499');
  const [originalPrice, setOriginalPrice] = useState('799');
  const [coachMargin, setCoachMargin] = useState('499');
  const [duration, setDuration] = useState('45 mins');
  const [badge, setBadge] = useState('100% Coach Earnings');
  const [description, setDescription] = useState(
    'Private 1:1 video consultation with Coach Kavya. Comprehensive audit of your routine, lab reports, customized nutrition roadmap, and immediate action steps.'
  );
  const [imageUrl, setImageUrl] = useState(PRESET_PHOTOS[0].url);

  if (!isOpen) return null;

  const handleTypeChange = (type: 'consultation' | 'product' | 'package') => {
    setOfferingType(type);
    if (type === 'consultation') {
      setCategory('Consultations');
      setName('1:1 Personal Transformation Deep Dive');
      setPrice('499');
      setOriginalPrice('799');
      setCoachMargin('499');
      setDuration('45 mins');
      setBadge('100% Coach Earnings');
      setDescription('Private 1:1 video consultation with Coach Kavya. Comprehensive audit of your routine, lab reports, customized nutrition roadmap, and immediate action steps.');
      setImageUrl(PRESET_PHOTOS[0].url);
    } else if (type === 'product') {
      setCategory('Products');
      setName("Coach Kavya's Signature Herbal Detox Blend (200g)");
      setPrice('399');
      setOriginalPrice('549');
      setCoachMargin('180');
      setDuration('');
      setBadge('Coach Signature');
      setDescription('Hand-curated herbal blend of organic green tea, ginger root, tulsi, and lemon peel for natural metabolism and anti-bloat morning hydration.');
      setImageUrl(PRESET_PHOTOS[2].url);
    } else {
      setCategory('Packages');
      setName('Monthly VIP Coaching + Supplement Kit');
      setPrice('1499');
      setOriginalPrice('1999');
      setCoachMargin('850');
      setDuration('30 days');
      setBadge('Best Value Bundle');
      setDescription('Everything your client needs: 2x 1:1 Video check-ins, custom meal prep guide, and starter detox supplement stack.');
      setImageUrl(PRESET_PHOTOS[5].url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const numPrice = Number(price) || 0;
    const numOrig = Number(originalPrice) || undefined;
    const numMargin = Number(coachMargin) || numPrice;

    addStoreItem({
      name: name.trim(),
      category: category as any,
      price: numPrice,
      originalPrice: numOrig,
      coachMargin: numMargin,
      duration: duration.trim() || undefined,
      isCoachDirect: true,
      ctaType: category === 'Consultations' ? 'Book Consultation' : 'Buy Now',
      description: description.trim(),
      inStock: true,
      image: imageUrl.trim() || PRESET_PHOTOS[0].url,
      rating: 5.0,
      badge: badge.trim() || (category === 'Consultations' ? '100% Coach Earnings' : 'Coach Direct'),
      soldCount: 0,
    });

    onClose();
  };

  const calculatedMargin = Number(coachMargin) || Number(price) || 0;
  const marginPercent = Number(price) > 0 ? Math.round((calculatedMargin / Number(price)) * 100) : 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Add Offering to Coach Store</h3>
              <p className="text-xs text-slate-300">
                Sell your own 1:1 consults, custom shakes, and products for direct coach revenue
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Offering Type Selector */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5 uppercase tracking-wider text-[11px]">
              Select Offering Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleTypeChange('consultation')}
                className={cn(
                  "p-3 rounded-2xl border text-left transition-all flex flex-col justify-between",
                  offeringType === 'consultation'
                    ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <Video className={cn("w-4 h-4", offeringType === 'consultation' ? "text-emerald-600" : "text-slate-500")} />
                  {offeringType === 'consultation' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <div className="mt-2">
                  <div className="font-bold text-slate-900 text-xs">1:1 Consultation</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">100% Coach Profit</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange('product')}
                className={cn(
                  "p-3 rounded-2xl border text-left transition-all flex flex-col justify-between",
                  offeringType === 'product'
                    ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <ShoppingBag className={cn("w-4 h-4", offeringType === 'product' ? "text-emerald-600" : "text-slate-500")} />
                  {offeringType === 'product' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <div className="mt-2">
                  <div className="font-bold text-slate-900 text-xs">Custom Product</div>
                  <div className="text-[10px] text-slate-500">Herbs, Shakes, Gear</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange('package')}
                className={cn(
                  "p-3 rounded-2xl border text-left transition-all flex flex-col justify-between",
                  offeringType === 'package'
                    ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <Package className={cn("w-4 h-4", offeringType === 'package' ? "text-emerald-600" : "text-slate-500")} />
                  {offeringType === 'package' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <div className="mt-2">
                  <div className="font-bold text-slate-900 text-xs">Package / Bundle</div>
                  <div className="text-[10px] text-slate-500">Calls + Kit Stack</div>
                </div>
              </button>
            </div>
          </div>

          {/* Title / Name */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {offeringType === 'consultation' ? 'Consultation Title' : 'Product / Package Name'} *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 1:1 Metabolic & Blood Report Audit"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs text-slate-900 font-medium"
              required
            />
          </div>

          {/* Pricing & Coach Margin Highlight */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Coach Direct Earnings Engine</span>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                {marginPercent}% Margin to Coach
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Retail Price (₹) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      if (offeringType === 'consultation') {
                        setCoachMargin(e.target.value);
                      }
                    }}
                    placeholder="2500"
                    className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 text-xs font-bold text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Original Price (₹)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="3500"
                    className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 text-xs text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Coach Profit (₹) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-emerald-600 font-bold">₹</span>
                  <input
                    type="number"
                    value={coachMargin}
                    onChange={(e) => setCoachMargin(e.target.value)}
                    placeholder="2500"
                    className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-emerald-300 focus:outline-none focus:border-emerald-600 text-xs font-black text-emerald-700"
                    required
                  />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-emerald-800 leading-relaxed">
              💡 When a customer buys this from your shop, <span className="font-bold text-emerald-900">₹{Number(coachMargin || price).toLocaleString('en-IN')}</span> goes directly to your bank account & CoachOS earnings.
            </p>
          </div>

          {/* Duration (if consultation) & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {offeringType === 'consultation' ? (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Call Duration</label>
                <div className="flex gap-2">
                  {['30 mins', '45 mins', '60 mins'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={cn(
                        "flex-1 py-2 text-xs rounded-xl border font-bold transition-all",
                        duration === d
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
                >
                  <option value="Products">Supplements & Products</option>
                  <option value="Packages">Bundles & Packages</option>
                  <option value="Memberships">VIP Memberships</option>
                </select>
              </div>
            )}

            <div>
              <label className="font-bold text-slate-700 block mb-1">Badge Tag</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. 100% Coach Earnings, Coach Signature"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
              />
            </div>
          </div>

          {/* Quick Preset Photos */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Select Product Photo
            </label>
            <div className="grid grid-cols-6 gap-2">
              {PRESET_PHOTOS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(p.url)}
                  className={cn(
                    "relative aspect-square rounded-xl overflow-hidden border-2 transition-all group",
                    imageUrl === p.url ? "border-emerald-500 ring-2 ring-emerald-500/20 scale-102" : "border-slate-200 opacity-70 hover:opacity-100"
                  )}
                  title={p.label}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                  {imageUrl === p.url && (
                    <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Or paste custom image URL"
              className="w-full mt-2 px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Description & What Client Gets</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the consultation or product benefits..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Visible in Coach Store & Client App</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Publish to Store</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
