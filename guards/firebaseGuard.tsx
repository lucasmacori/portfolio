'use client';

import { FC, useEffect } from "react";
import { initFirebase, type FirebaseConfig } from "@/lib/firebase";

const FirebaseGuard: FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then((cfg) => {
        const config: FirebaseConfig = cfg.firebase;
        if (!config.apiKey) return;
        const app = initFirebase(config);
        import("firebase/analytics").then(({ getAnalytics }) => {
          getAnalytics(app);
        });
      });
  }, []);

  return <>{children}</>;
};

export default FirebaseGuard;
