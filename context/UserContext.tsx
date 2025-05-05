"use client";
import type { ReactNode } from "react";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  family: string;
  mobile: string;
  isAdmin: boolean;
  baleId: string;
  extraInfo: any;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    if (cookieUser) {
      try {
        setUserState(JSON.parse(cookieUser));
      } catch {
        Cookies.remove("user");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
    } else {
      Cookies.remove("user");
    }
  }, [user]);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
