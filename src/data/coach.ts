import { CoachProfile } from '../types';

export const INITIAL_COACH: CoachProfile = {
  name: 'Kavya Menon',
  businessName: 'Kavya Wellness',
  subdomain: 'kavyawellness.coachos.app',
  plan: 'Growth',
  monthlyFee: 9999,
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  coverImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
  bio: 'Certified Holistic Nutritionist & Transformation Coach. Helping busy professionals build sustainable habits, master body composition, and regain metabolic vitality.',
  yearsExperience: 7,
  phone: '+91 98201 45890',
  welcomeMessage: 'Welcome to Kavya Wellness! Your 60-day path to sustainable vitality starts right here.',
  themeColor: '#0D9488', // Emerald/Teal primary
  themeName: 'Emerald Teal',
  accentColor: '#14B8A6',
  socials: {
    instagram: '@kavya_wellness_coach',
    whatsapp: '+91 98201 45890',
    youtube: 'KavyaMenonWellness',
    website: 'https://kavyawellness.com',
  },
  referralRewardType: '₹250 discount',
  stats: {
    activeCustomers: 86,
    newLeads: 12,
    referralLeads: 7,
    customersAtRisk: 9,
    renewalsDue: 6,
    monthRevenue: 68500,
  },
};

export const COLOR_THEMES = [
  { name: 'Emerald Teal', primary: '#0D9488', accent: '#14B8A6', light: '#F0FDFA', dark: '#115E59' },
  { name: 'Royal Indigo', primary: '#4F46E5', accent: '#6366F1', light: '#EEF2FF', dark: '#3730A3' },
  { name: 'Sunset Rose', primary: '#E11D48', accent: '#F43F5E', light: '#FFF1F2', dark: '#9F1239' },
  { name: 'Vibrant Amber', primary: '#D97706', accent: '#F59E0B', light: '#FFFBEB', dark: '#92400E' },
  { name: 'Violet Spark', primary: '#7C3AED', accent: '#8B5CF6', light: '#F5F3FF', dark: '#5B21B6' },
  { name: 'Ocean Cyan', primary: '#0284C7', accent: '#0EA5E9', light: '#F0F9FF', dark: '#075985' },
];
