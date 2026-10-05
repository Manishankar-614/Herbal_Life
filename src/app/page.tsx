'use client';

import React from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { DemoSwitcher } from '../components/common/DemoSwitcher';

// Layouts
import { CoachLayout } from '../components/layout/CoachLayout';
import { CustomerPhoneFrame } from '../components/layout/CustomerPhoneFrame';
import { AdminLayout } from '../components/layout/AdminLayout';

// Coach Screens
import { CoachLoginScreen } from '../components/coach/CoachLoginScreen';
import { CoachHomeScreen } from '../components/coach/CoachHomeScreen';
import { CustomersListScreen } from '../components/coach/CustomersListScreen';
import { Customer360Screen } from '../components/coach/Customer360Screen';
import { LeadsReferralsScreen } from '../components/coach/LeadsReferralsScreen';
import { RetentionRadarScreen } from '../components/coach/RetentionRadarScreen';
import { ProgramsCommerceScreen } from '../components/coach/ProgramsCommerceScreen';
import { BusinessScreen } from '../components/coach/BusinessScreen';
import { GrowthHubScreen } from '../components/coach/GrowthHubScreen';
import { CoachOnboardingModal } from '../components/coach/CoachOnboardingModal';

// Customer Screens
import { CustomerWelcomeScreen } from '../components/customer/CustomerWelcomeScreen';
import { CustomerAssessmentScreen } from '../components/customer/CustomerAssessmentScreen';
import { CustomerHomeScreen } from '../components/customer/CustomerHomeScreen';
import { CustomerJourneyScreen } from '../components/customer/CustomerJourneyScreen';
import { CustomerProgressScreen } from '../components/customer/CustomerProgressScreen';
import { CustomerRewardsScreen } from '../components/customer/CustomerRewardsScreen';
import { CustomerReferralScreen } from '../components/customer/CustomerReferralScreen';
import { CustomerCoachScreen } from '../components/customer/CustomerCoachScreen';

// Admin Screens
import { AdminDashboardScreen } from '../components/admin/AdminDashboardScreen';
import { CoachManagementScreen } from '../components/admin/CoachManagementScreen';
import { AdminSubscriptionsScreen } from '../components/admin/AdminSubscriptionsScreen';
import { AdminTemplatesScreen } from '../components/admin/AdminTemplatesScreen';
import { AdminSystemHealthScreen } from '../components/admin/AdminSystemHealthScreen';

function MainApp() {
  const { currentRole, coachScreen, customerTab, adminScreen } = useApp();

  return (
    <>
      {/* 1. Coach Role View */}
      {currentRole === 'coach' && (
        <>
          {coachScreen === 'login' ? (
            <CoachLoginScreen />
          ) : coachScreen === 'coach-onboarding' ? (
            <CoachOnboardingModal />
          ) : (
            <CoachLayout>
              {coachScreen === 'command-center' && <CoachHomeScreen />}
              {coachScreen === 'retention-radar' && <RetentionRadarScreen />}
              {coachScreen === 'customers' && <CustomersListScreen />}
              {coachScreen === 'customer-360' && <Customer360Screen />}
              {coachScreen === 'leads-referrals' && <LeadsReferralsScreen />}
              {coachScreen === 'growth-hub' && <GrowthHubScreen />}
              {coachScreen === 'programs-commerce' && <ProgramsCommerceScreen />}
              {coachScreen === 'business' && <BusinessScreen />}
            </CoachLayout>
          )}
        </>
      )}

      {/* 2. Customer Role View (Rendered mobile-first in phone frame) */}
      {currentRole === 'customer' && (
        <CustomerPhoneFrame>
          {customerTab === 'welcome' && <CustomerWelcomeScreen />}
          {customerTab === 'assessment' && <CustomerAssessmentScreen />}
          {customerTab === 'home' && <CustomerHomeScreen />}
          {customerTab === 'journey' && <CustomerJourneyScreen />}
          {customerTab === 'progress' && <CustomerProgressScreen />}
          {customerTab === 'rewards' && <CustomerRewardsScreen />}
          {customerTab === 'referral' && <CustomerReferralScreen />}
          {customerTab === 'coach' && <CustomerCoachScreen />}
        </CustomerPhoneFrame>
      )}

      {/* 3. Platform Admin Role View */}
      {currentRole === 'admin' && (
        <AdminLayout>
          {adminScreen === 'dashboard' && <AdminDashboardScreen />}
          {adminScreen === 'coach-management' && <CoachManagementScreen />}
          {adminScreen === 'subscriptions' && <AdminSubscriptionsScreen />}
          {adminScreen === 'templates' && <AdminTemplatesScreen />}
          {adminScreen === 'system-health' && <AdminSystemHealthScreen />}
        </AdminLayout>
      )}

      {/* Floating Demo Mode Switcher (Always accessible) */}
      <DemoSwitcher />
    </>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
