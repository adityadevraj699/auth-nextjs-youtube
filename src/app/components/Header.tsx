"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    };

    checkSession();
  }, [isAuthenticated]);

  console.log("User Authenticated: ", isAuthenticated);

  return (
    <header className="w-full fixed top-0 left-0 bg-black text-violet-500 z-50">
    <nav className="flex justify-center items-center p-4">
      <ul className="flex flex-col md:flex-row items-center">
        {isAuthenticated ? (
          <>
            <li className="mx-2 my-1 md:my-0">
              <Link href="/" className="hover:text-white transition-colors duration-300">
                Home
              </Link>
            </li>
            <li className="mx-2 my-1 md:my-0">
              <Link href="/profile" className="hover:text-white transition-colors duration-300">
                Profile
              </Link>
            </li>
          </>
        ) : (
          <li className="mx-2 my-1 md:my-0">
            <Link href="/login" className="hover:text-white transition-colors duration-300">
             Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  </header>
);
};

export default Header;
