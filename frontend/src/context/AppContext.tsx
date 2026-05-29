"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getApiUrl } from "@/lib/api";

interface AppContextType {
  settings: Record<string, string>;
  projects: any[];
  services: any[];
  pricingTiers: any[];
  faqs: any[];
  blogs: any[];
  isDataLoaded: boolean; // True when API calls resolve
  preloaderActive: boolean; // True until preloader finish fade-out
  setPreloaderActive: (active: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [pricingTiers, setPricingTiers] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [preloaderActive, setPreloaderActive] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      const startTime = Date.now();
      
      // Define fetches with catch blocks so a single failing API does not block the entire site
      const fetchSettings = async () => {
        try {
          const res = await fetch(getApiUrl("/api/v1/settings"));
          if (res.ok) {
            const data = await res.json();
            const settingsMap: Record<string, string> = {};
            if (Array.isArray(data)) {
              data.forEach((s: any) => {
                settingsMap[s.key] = s.value;
              });
            }
            return settingsMap;
          }
        } catch (e) {
          console.error("Failed to pre-fetch settings:", e);
        }
        return {};
      };

      const fetchProjects = async () => {
        try {
          const res = await fetch(getApiUrl("/api/v1/projects"));
          if (res.ok) {
            const data = await res.json();
            return data.items || [];
          }
        } catch (e) {
          console.error("Failed to pre-fetch projects:", e);
        }
        return [];
      };

      const fetchServices = async () => {
        try {
          const res = await fetch(getApiUrl("/api/v1/services"));
          if (res.ok) {
            const data = await res.json();
            return data.items || [];
          }
        } catch (e) {
          console.error("Failed to pre-fetch services:", e);
        }
        return [];
      };

      const fetchPricingTiers = async () => {
        try {
          const res = await fetch(getApiUrl("/api/v1/settings/pricing_tiers"));
          if (res.ok) {
            const data = await res.json();
            if (data && data.value) {
              const parsed = JSON.parse(data.value);
              if (Array.isArray(parsed)) {
                return parsed;
              }
            }
          }
        } catch (e) {
          console.error("Failed to pre-fetch pricing tiers:", e);
        }
        return [];
      };

      const fetchFaqs = async () => {
        try {
          const res = await fetch(getApiUrl("/api/v1/faqs"));
          if (res.ok) {
            const data = await res.json();
            return Array.isArray(data) ? data : [];
          }
        } catch (e) {
          console.error("Failed to pre-fetch FAQs:", e);
        }
        return [];
      };

      const fetchBlogs = async () => {
        try {
          const res = await fetch(getApiUrl("/api/v1/blog"));
          if (res.ok) {
            const data = await res.json();
            return data.items || [];
          }
        } catch (e) {
          console.error("Failed to pre-fetch blogs:", e);
        }
        return [];
      };

      // Execute all API requests concurrently
      const [
        loadedSettings,
        loadedProjects,
        loadedServices,
        loadedPricingTiers,
        loadedFaqs,
        loadedBlogs,
      ] = await Promise.all([
        fetchSettings(),
        fetchProjects(),
        fetchServices(),
        fetchPricingTiers(),
        fetchFaqs(),
        fetchBlogs(),
      ]);

      // Set global states
      setSettings(loadedSettings);
      setProjects(loadedProjects);
      setServices(loadedServices);
      setPricingTiers(loadedPricingTiers);
      setFaqs(loadedFaqs);
      setBlogs(loadedBlogs);

      // Log total load time for optimization tracing
      const loadTime = Date.now() - startTime;
      console.log(`[AppContext] All APIs pre-fetched in ${loadTime}ms`);

      // Ensure data loaded is set to true
      setIsDataLoaded(true);
    };

    loadAllData();
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== "undefined" && typeof (window as any).initInViewAnimations === "function") {
        (window as any).initInViewAnimations();
      }
    };

    // Delay slightly to allow Next.js route transition and DOM mount to finish
    const timer = setTimeout(handleRouteChange, 80);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AppContext.Provider
      value={{
        settings,
        projects,
        services,
        pricingTiers,
        faqs,
        blogs,
        isDataLoaded,
        preloaderActive,
        setPreloaderActive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
