'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Award, 
  ShieldCheck, 
  CreditCard, 
  ExternalLink, 
  Star, 
  Users, 
  TrendingUp, 
  Smartphone, 
  Sliders, 
  CheckCircle2, 
  Building2,
  Calendar,
  ChevronRight,
  LogOut,
  Edit3,
  Check,
  Save,
  Phone,
  Briefcase
} from 'lucide-react';
import { formatINR, cn } from '../../lib/utils';

interface CoachProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings?: () => void;
  onOpenMeetupModal?: () => void;
}

export const CoachProfileModal: React.FC<CoachProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenSettings,
  onOpenMeetupModal,
}) => {
  const { coach, updateCoachProfile, showNotification } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(coach.name);
  const [businessName, setBusinessName] = useState(coach.businessName);
  const [bio, setBio] = useState(coach.bio);
  const [experience, setExperience] = useState((coach.yearsExperience ?? 7).toString());
  const [phone, setPhone] = useState(coach.phone || '+91 98450 12891');

  if (!isOpen) return null;

  const handleSave = () => {
    updateCoachProfile({
      name,
      businessName,
      bio,
      yearsExperience: parseInt(experience) || coach.yearsExperience || 7,
      phone,
    });
    setIsEditing(false);
    showNotification('Coach profile updated successfully!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 font-sans animate-in fade-in duration-150">
      <div className="bg-white rounded-none sm:rounded-3xl max-w-xl w-full shadow-2xl border-0 sm:border border-slate-200 overflow-hidden flex flex-col h-full sm:h-auto max-h-[100vh] sm:max-h-[90vh]">
        
        {/* Header Cover Banner */}
        <div 
          className="p-6 pb-5 text-white relative overflow-hidden shrink-0"
          style={{
            background: `linear-gradient(135deg, var(--brand-primary) 0%, #0F172A 100%)`
          }}
        >
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white">{name}</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-400 text-slate-950 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Coach</span>
                  </span>
                </div>
                <div className="text-xs text-emerald-200 font-semibold">{businessName}</div>
                <div className="text-[11px] text-slate-300 font-mono mt-0.5">{coach.subdomain}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={onClose} 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all shadow-xs cursor-pointer group"
                title="Back to Dashboard"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-white group-hover:-translate-x-0.5 transition-transform" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs",
                  isEditing 
                    ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                    : "bg-white/20 hover:bg-white/30 text-white"
                )}
              >
                {isEditing ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>View Profile</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/10 text-center relative z-10">
            <div>
              <span className="text-[10px] text-slate-300 uppercase block font-semibold">Clients</span>
              <span className="text-sm font-black text-white">86 Active</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-300 uppercase block font-semibold">Retention</span>
              <span className="text-sm font-black text-emerald-400">94.2%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-300 uppercase block font-semibold">Revenue</span>
              <span className="text-sm font-black text-white">{formatINR(184000)}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-300 uppercase block font-semibold">Rating</span>
              <span className="text-sm font-black text-amber-300 flex items-center justify-center gap-0.5">
                <Star className="w-3 h-3 fill-amber-300" />
                <span>4.9</span>
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Body: View vs Edit Mode */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {isEditing ? (
            /* EDIT PROFILE FORM */
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Edit Coach Credentials & Bio
                </span>
                <span className="text-[11px] text-slate-500">Live preview active</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Business / Brand Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Bio & Coaching Philosophy</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Support WhatsApp</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Updates</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* READ-ONLY PROFILE OVERVIEW */
            <>
              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">About Coach</h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  {bio}
                </p>
              </div>

              {/* Certifications & Badges */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Verified Certifications</h4>
                <div className="space-y-2">
                  {[
                    { title: 'ISSA Certified Specialist in Sports Nutrition', issuer: 'International Sports Sciences Association', year: '2021' },
                    { title: 'K11 School of Sports Science - Personal Trainer', issuer: 'K11 Fitness Academy Mumbai', year: '2019' },
                    { title: 'Precision Nutrition Level 1 (Pn1)', issuer: 'Precision Nutrition USA', year: '2023' },
                  ].map((cert, idx) => (
                    <div key={idx} className="p-3 rounded-2xl border border-slate-100 bg-white flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{cert.title}</div>
                          <div className="text-[10px] text-slate-500">{cert.issuer} · {cert.year}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settlement Bank Details */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Direct Settlement Account</h4>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-slate-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">HDFC Bank · Current Account</div>
                      <div className="text-[10px] text-slate-500 font-mono">A/C: ************8812 · IFSC: HDFC0001234</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500">Auto-settled weekly</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenSettings) onOpenSettings();
                  }}
                  className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-slate-600" />
                    <span>Studio Settings</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onOpenMeetupModal) onOpenMeetupModal();
                  }}
                  className="p-3 rounded-2xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-900 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    <span>15-Day Meetup Check</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
