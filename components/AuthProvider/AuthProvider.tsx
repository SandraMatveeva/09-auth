"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getMe, logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const setUser = useAuthStore((s) => s.setUser);
  const clear = useAuthStore((s) => s.clearIsAuthenticated);

  console.log({pathname});
  

  const isPrivateRoute =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch {
        clear();

        if (isPrivateRoute) {
          await logout();
          router.push("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}