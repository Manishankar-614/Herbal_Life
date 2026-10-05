export type UserRole = 'coach' | 'customer' | 'admin';

export type CoachNavScreen = 
  | 'login'
  | 'command-center'
  | 'customers'
  | 'customer-360'
  | 'leads-referrals'
  | 'retention-radar'
  | 'programs-commerce'
  | 'business'
  | 'coach-onboarding'
  | 'growth-hub';

export type CustomerNavTab = 
  | 'home'
  | 'journey'
  | 'progress'
  | 'rewards'
  | 'referral'
  | 'coach'
  | 'welcome'
  | 'assessment';

export type AdminNavScreen = 
  | 'dashboard'
  | 'coach-management'
  | 'subscriptions'
  | 'templates'
  | 'system-health';

export type CustomerStatus = 
  | 'healthy'
  | 'declining'
  | 'follow-up'
  | 'high-risk'
  | 'renewal'
  | 'next-journey';

export interface Customer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  city: string;
  programName: string;
  programDay: number;
  programTotalDays: number;
  progressPercent: number;
  streakDays: number;
  engagementScore: number; // 0-100
  engagementTrend: 'up' | 'down' | 'neutral';
  status: CustomerStatus;
  statusReasons: string[];
  joinDate: string;
  renewalDate: string;
  daysUntilRenewal: number;
  referredBy?: string;
  referralsGenerated: number;
  referralsConverted: number;
  totalSpent: number;
  primaryGoal: string;
  currentWeightKg: number;
  startWeightKg: number;
  targetWeightKg: number;
  weightHistory: { date: string; weight: number }[];
  recentActivities: { id: string; action: string; time: string; icon: string }[];
  missedMissionsCount: number;
  lastActiveDaysAgo: number;
  lastCoachInteractionDaysAgo: number;
  recommendedActions: string[];
  purchases: { id: string; item: string; date: string; amount: number; type: 'program' | 'product' | 'consultation' }[];
  messages: { id: string; sender: 'coach' | 'customer'; text: string; timestamp: string }[];
  notes?: string;
  nextRecommendedJourney?: string;
}

export type LeadStage = 'new' | 'contacted' | 'assessment' | 'interested' | 'converted';
export type LeadScore = 'hot' | 'warm' | 'cold';
export type LeadSource = 'Instagram' | 'QR Campaign' | 'Referral' | 'Existing Customer' | 'WhatsApp' | 'Website' | 'Challenges' | 'Partners';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  stage: LeadStage;
  score?: LeadScore;
  referredBy?: string;
  goal: string;
  value: number;
  createdAt: string;
  notes?: string;
  lastActivity: string;
}

export interface ProgramTemplate {
  id: string;
  title: string;
  category: string;
  durationWeeks: number;
  totalDays: number;
  price: number;
  badge: string;
  summary: string;
  goals: string[];
  dailyActivities: string[];
  milestones: string[];
  challenges: string[];
  recommendedProducts: string[];
  activeEnrollments: number;
  completionRate: number;
}

export interface StoreItem {
  id: string;
  name: string;
  category: 'Products' | 'Programs' | 'Consultations' | 'Memberships' | 'Packages';
  price: number;
  originalPrice?: number;
  ctaType: 'Buy Now' | 'Request Product' | 'Talk to Coach' | 'Approved Purchase Link';
  description: string;
  inStock: boolean;
  image: string;
  rating: number;
  badge?: string;
}

export interface CoachProfile {
  name: string;
  businessName: string;
  subdomain: string;
  plan: 'Essential' | 'Growth' | 'Scale';
  monthlyFee: number;
  avatar: string;
  coverImage: string;
  bio: string;
  yearsExperience?: number;
  phone?: string;
  welcomeMessage: string;
  themeColor: string; // hex
  themeName: string;
  accentColor: string;
  socials: {
    instagram: string;
    whatsapp: string;
    youtube: string;
    website: string;
  };
  referralRewardType: '₹250 discount' | '500 reward points' | 'Free Consultation call';
  stats: {
    activeCustomers: number;
    newLeads: number;
    referralLeads: number;
    customersAtRisk: number;
    renewalsDue: number;
    monthRevenue: number;
  };
}

export interface AdminCoachRecord {
  id: string;
  coachName: string;
  businessName: string;
  subdomain: string;
  plan: 'Essential' | 'Growth' | 'Scale';
  status: 'Active' | 'Trial' | 'Suspended';
  customerCount: number;
  mrr: number;
  joinedDate: string;
  retentionRate: number;
}
