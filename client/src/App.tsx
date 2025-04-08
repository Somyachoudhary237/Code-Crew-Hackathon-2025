import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import SpacesPage from "@/pages/spaces-page";
import BookingsPage from "@/pages/bookings-page";
import FavoritesPage from "@/pages/favorites-page";
import ContactPage from "@/pages/contact-page";
import HelpCenterPage from "@/pages/help-center-page";
import AboutPage from "@/pages/about-page";
import PreferencesPage from "@/pages/preferences-page";
import LibrariesPage from "@/pages/libraries-page";
import StudyRoomsPage from "@/pages/study-rooms-page";
import { AuthProvider } from "@/hooks/use-auth";
import { WebSocketProvider } from "@/hooks/use-websocket";
import { ProtectedRoute } from "./lib/protected-route";
import { useEffect } from "react";
import { BasePathProvider, useBasePath, makePath } from "./lib/base-path";

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path={makePath("/")} component={HomePage} />
        <Route path={makePath("/auth")} component={AuthPage} />
        <Route path={makePath("/spaces")} component={SpacesPage} />
        <Route path={makePath("/preferences")} component={PreferencesPage} />
        <Route path={makePath("/libraries")} component={LibrariesPage} />
        <Route path={makePath("/study-rooms")} component={StudyRoomsPage} />
        <ProtectedRoute path={makePath("/bookings")} component={BookingsPage} />
        <ProtectedRoute path={makePath("/favorites")} component={FavoritesPage} />
        <Route path={makePath("/contact")} component={ContactPage} />
        <Route path={makePath("/help")} component={HelpCenterPage} />
        <Route path={makePath("/about")} component={AboutPage} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

// Create a custom wrapper component that sets up a router context
function CustomRouter({ children }: { children: React.ReactNode }) {
  const basePath = useBasePath();
  // Make sure base path doesn't have trailing slash
  const basePathWithoutTrailingSlash = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  const base = basePathWithoutTrailingSlash === '/' ? '' : basePathWithoutTrailingSlash;
  
  // Instead of using WouterRouter directly, we'll set up the environment to work with base path
  useEffect(() => {
    console.log('Router using base path:', base || '/');
  }, [base]);
  
  return <>{children}</>;
}

function App() {
  useEffect(() => {
    console.log('App initialized with base path support');
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <BasePathProvider>
        <CustomRouter>
          <AuthProvider>
            <WebSocketProvider>
              <Router />
              <Toaster />
            </WebSocketProvider>
          </AuthProvider>
        </CustomRouter>
      </BasePathProvider>
    </QueryClientProvider>
  );
}

export default App;
