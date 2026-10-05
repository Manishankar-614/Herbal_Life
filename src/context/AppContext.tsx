'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  CoachNavScreen, 
  CustomerNavTab, 
  AdminNavScreen, 
  Customer, 
  Lead, 
  CoachProfile,
  LeadStage,
  CustomerStatus,
  StoreItem
} from '../types';
import { INITIAL_COACH, COLOR_THEMES } from '../data/coach';
import { INITIAL_CUSTOMERS } from '../data/customers';
import { INITIAL_LEADS } from '../data/leads';
import { STORE_ITEMS } from '../data/store';

export interface TodayMission {
  id: string;
  title: string;
  category: 'Hydration' | 'Nutrition' | 'Activity' | 'Coaching';
  completed: boolean;
  points: number;
}

interface AppContextType {
  // Navigation & Role
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  coachScreen: CoachNavScreen;
  setCoachScreen: (screen: CoachNavScreen) => void;
  customerTab: CustomerNavTab;
  setCustomerTab: (tab: CustomerNavTab) => void;
  adminScreen: AdminNavScreen;
  setAdminScreen: (screen: AdminNavScreen) => void;

  // Selected entities
  selectedCustomerId: string;
  setSelectedCustomerId: (id: string) => void;
  selectedCustomer: Customer;

  // Coach & White-labeling
  coach: CoachProfile;
  updateCoachTheme: (themeColor: string, accentColor?: string, themeName?: string) => void;
  updateCoachProfile: (updates: Partial<CoachProfile>) => void;

  // Customers state & mutations
  customers: Customer[];
  updateCustomerStatus: (id: string, status: CustomerStatus) => void;
  sendActionToCustomer: (customerId: string, actionType: string, note?: string) => void;

  // Leads & Kanban state
  leads: Lead[];
  moveLeadStage: (leadId: string, newStage: LeadStage) => void;
  addLead: (newLead: Partial<Lead>) => void;

  // Customer app interactive state (Rohan Deshpande)
  missions: TodayMission[];
  toggleMission: (id: string) => void;
  customerXp: number;
  customerStreak: number;
  referralCodeCopied: boolean;
  setReferralCodeCopied: (val: boolean) => void;

  // Toast / notification system
  notification: { message: string; type: 'success' | 'info' | 'warning' } | null;
  showNotification: (message: string, type?: 'success' | 'info' | 'warning') => void;

  // Helper quick actions
  openCustomer360: (customerId: string) => void;

  // Dark / Light Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Store & Coach Products/Consultations
  storeItems: StoreItem[];
  addStoreItem: (item: Omit<StoreItem, 'id'>) => void;
  purchaseStoreItem: (itemId: string, details?: { notes?: string; slot?: string; address?: string }) => void;

  // Evening Wrap-up submission
  eveningWrapUpDone: boolean;
  submitEveningWrapUp: (data: { mealsLogged: boolean; waterGoalHit: boolean; workoutDone: boolean; reflection: string }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_MISSIONS: TodayMission[] = [
  { id: 'm-1', title: 'Morning Hydration (1L lemon salt)', category: 'Hydration', completed: true, points: 20 },
  { id: 'm-2', title: 'Breakfast check-in (30g protein)', category: 'Nutrition', completed: true, points: 25 },
  { id: 'm-3', title: '8,000 steps target today', category: 'Activity', completed: false, points: 40 },
  { id: 'm-4', title: 'Evening 20-min resistance activity', category: 'Activity', completed: false, points: 50 },
  { id: 'm-5', title: 'Daily Coach check-in response', category: 'Coaching', completed: false, points: 30 },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentRole, setCurrentRole] = useState<UserRole>('coach');
  const [coachScreen, setCoachScreen] = useState<CoachNavScreen>('command-center');
  const [customerTab, setCustomerTab] = useState<CustomerNavTab>('home');
  const [adminScreen, setAdminScreen] = useState<AdminNavScreen>('dashboard');

  // Theme State
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');

  // Evening wrap-up completed
  const [eveningWrapUpDone, setEveningWrapUpDone] = useState<boolean>(false);

  // Selected customer
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('cust-1');

  // State
  const [coach, setCoach] = useState<CoachProfile>(INITIAL_COACH);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [missions, setMissions] = useState<TodayMission[]>(INITIAL_MISSIONS);
  const [storeItems, setStoreItems] = useState<StoreItem[]>(STORE_ITEMS);
  const [customerXp, setCustomerXp] = useState<number>(1420);
  const [customerStreak, setCustomerStreak] = useState<number>(12);
  const [referralCodeCopied, setReferralCodeCopied] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Sync theme with html root class
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    showNotification(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} mode`, 'info');
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Apply CSS custom properties whenever coach theme changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--brand-primary', coach.themeColor);
      root.style.setProperty('--brand-accent', coach.accentColor);
      // Generate a soft tint
      root.style.setProperty('--brand-light', `${coach.themeColor}12`);
      root.style.setProperty('--brand-focus', `${coach.themeColor}33`);
    }
  }, [coach.themeColor, coach.accentColor]);

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3800);
  };

  const updateCoachTheme = (themeColor: string, accentColor?: string, themeName?: string) => {
    const selected = COLOR_THEMES.find(t => t.primary.toLowerCase() === themeColor.toLowerCase());
    const accent = accentColor || selected?.accent || themeColor;
    const name = themeName || selected?.name || 'Custom Brand';
    
    setCoach(prev => ({
      ...prev,
      themeColor,
      accentColor: accent,
      themeName: name,
    }));
    showNotification(`Theme updated to ${name}! Customer app re-themed live.`, 'success');
  };

  const updateCoachProfile = (updates: Partial<CoachProfile>) => {
    setCoach(prev => ({ ...prev, ...updates }));
    showNotification('Coach profile & branding saved successfully!', 'success');
  };

  const updateCustomerStatus = (id: string, status: CustomerStatus) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    showNotification('Customer status updated.', 'info');
  };

  const sendActionToCustomer = (customerId: string, actionType: string, note?: string) => {
    const target = customers.find(c => c.id === customerId);
    const targetName = target ? target.name : 'Customer';
    
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          lastCoachInteractionDaysAgo: 0,
          messages: [
            ...c.messages,
            {
              id: `m-${Date.now()}`,
              sender: 'coach',
              text: note || `Hi ${c.name.split(' ')[0]}, ${actionType} - Coach Kavya`,
              timestamp: 'Just now',
            }
          ]
        };
      }
      return c;
    }));

    showNotification(`${actionType} dispatched to ${targetName}!`, 'success');
  };

  const moveLeadStage = (leadId: string, newStage: LeadStage) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
    const movedLead = leads.find(l => l.id === leadId);
    showNotification(`Moved ${movedLead?.name || 'lead'} to ${newStage.toUpperCase()}`, 'info');
  };

  const addLead = (newLeadData: Partial<Lead>) => {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: newLeadData.name || 'New Prospect',
      email: newLeadData.email || 'prospect@example.com',
      phone: newLeadData.phone || '+91 99999 00000',
      source: newLeadData.source || 'Website',
      stage: 'new',
      goal: newLeadData.goal || 'General Transformation',
      value: newLeadData.value || 1499,
      createdAt: 'Just now',
      notes: newLeadData.notes || 'Inquiry received through digital campaign',
      lastActivity: 'Form submitted',
    };
    setLeads(prev => [newLead, ...prev]);
    showNotification(`New lead "${newLead.name}" added to pipeline!`, 'success');
  };

  const toggleMission = (id: string) => {
    setMissions(prev => prev.map(m => {
      if (m.id === id) {
        const nextState = !m.completed;
        if (nextState) {
          setCustomerXp(curr => curr + m.points);
          showNotification(`Mission complete! +${m.points} XP earned 🔥`, 'success');
        } else {
          setCustomerXp(curr => Math.max(0, curr - m.points));
        }
        return { ...m, completed: nextState };
      }
      return m;
    }));
  };

  const addStoreItem = (newItemData: Omit<StoreItem, 'id'>) => {
    const newItem: StoreItem = {
      ...newItemData,
      id: `custom-store-${Date.now()}`,
      soldCount: 0,
      isCoachDirect: true,
      inStock: true,
      rating: 5.0,
    };
    setStoreItems(prev => [newItem, ...prev]);
    showNotification(`Success! "${newItem.name}" is now live in your Client Store Catalog & Customer App!`, 'success');
  };

  const purchaseStoreItem = (itemId: string, details?: { notes?: string; slot?: string; address?: string }) => {
    const item = storeItems.find(i => i.id === itemId);
    if (!item) return;

    // Increment coach revenue by item price or coachMargin
    const revenueGained = item.coachMargin ?? item.price;
    setCoach(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        monthRevenue: prev.stats.monthRevenue + revenueGained,
      }
    }));

    // Update sold count
    setStoreItems(prev => prev.map(i => i.id === itemId ? { ...i, soldCount: (i.soldCount || 0) + 1 } : i));

    // Award XP to customer
    setCustomerXp(prev => prev + 150);

    const isConsult = item.category === 'Consultations' || item.ctaType === 'Book Consultation';
    if (isConsult) {
      showNotification(`🎉 1:1 Consultation booked with Coach Kavya for ${details?.slot || 'Tomorrow 4:00 PM'}! +₹${revenueGained.toLocaleString('en-IN')} credited to coach revenue!`, 'success');
    } else {
      showNotification(`🎉 Order placed for ${item.name}! +₹${revenueGained.toLocaleString('en-IN')} credited to coach revenue!`, 'success');
    }
  };

  const submitEveningWrapUp = (data: { mealsLogged: boolean; waterGoalHit: boolean; workoutDone: boolean; reflection: string }) => {
    setEveningWrapUpDone(true);
    setCustomerStreak(s => s + 1);
    setCustomerXp(xp => xp + 100);
    showNotification('🌟 Evening Wrap-Up logged! Day 34 milestone saved & +100 XP awarded!', 'success');
  };

  const openCustomer360 = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setCoachScreen('customer-360');
  };

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        coachScreen,
        setCoachScreen,
        customerTab,
        setCustomerTab,
        adminScreen,
        setAdminScreen,
        selectedCustomerId,
        setSelectedCustomerId,
        selectedCustomer,
        coach,
        updateCoachTheme,
        updateCoachProfile,
        customers,
        updateCustomerStatus,
        sendActionToCustomer,
        leads,
        moveLeadStage,
        addLead,
        missions,
        toggleMission,
        customerXp,
        customerStreak,
        referralCodeCopied,
        setReferralCodeCopied,
        notification,
        showNotification,
        openCustomer360,
        theme,
        setTheme,
        toggleTheme,
        storeItems,
        addStoreItem,
        purchaseStoreItem,
        eveningWrapUpDone,
        submitEveningWrapUp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
