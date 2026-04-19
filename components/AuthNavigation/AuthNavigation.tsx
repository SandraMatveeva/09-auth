"use client";

import { useRouter } from "next/navigation";
import css from "./AuthNavigation.module.css";
import { logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";

export default function AuthNavigation() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    try {
      await logout();

      clearIsAuthenticated();

      router.push("/sign-in");
    } catch (err) {
      console.log("Logout failed");
    }
  };

  return (
    <>
      {user && (
        <li className={css.navigationItem}>
          <Link href="/profile" className={css.navigationLink}>
            Profile
          </Link>
        </li>
      )}

      {user && (
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user.email}</p>

          <button onClick={handleLogout} className={css.logoutButton}>
            Logout
          </button>
        </li>
      )}

      {!user && (
        <>
          <li className={css.navigationItem}>
            <a href="/sign-in" className={css.navigationLink}>
              Login
            </a>
          </li>

          <li className={css.navigationItem}>
            <a href="/sign-up" className={css.navigationLink}>
              Sign up
            </a>
          </li>
        </>
      )}
    </>
  );
}