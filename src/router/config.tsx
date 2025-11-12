
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const SplashPage = lazy(() => import('../pages/splash/page'));
const OnboardingPage = lazy(() => import('../pages/onboarding/page'));
const AuthPage = lazy(() => import('../pages/auth/page'));
const HomePage = lazy(() => import('../pages/home/page'));
const SearchPage = lazy(() => import('../pages/search/page'));
const AdvocateProfilePage = lazy(() => import('../pages/advocate-profile/page'));
const BookingPage = lazy(() => import('../pages/booking/page'));
const CasesPage = lazy(() => import('../pages/cases/page'));
const CaseTrackerPage = lazy(() => import('../pages/case-tracker/page'));
const SavedPage = lazy(() => import('../pages/saved/page'));
const ProfilePage = lazy(() => import('../pages/profile/page'));
const NotificationsPage = lazy(() => import('../pages/notifications/page'));
const ChatPage = lazy(() => import('../pages/chat/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <SplashPage />
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />
  },
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/search',
    element: <SearchPage />
  },
  {
    path: '/advocate/:id',
    element: <AdvocateProfilePage />
  },
  {
    path: '/booking/:advocateId',
    element: <BookingPage />
  },
  {
    path: '/cases',
    element: <CasesPage />
  },
  {
    path: '/case-tracker',
    element: <CaseTrackerPage />
  },
  {
    path: '/saved',
    element: <SavedPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/notifications',
    element: <NotificationsPage />
  },
  {
    path: '/chat/:advocateId',
    element: <ChatPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

export default routes;
