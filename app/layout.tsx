import { Vazirmatn } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Providers from "./providers";
import { UserProvider } from "@/context/UserContext";
import Header from "@/components/Header/Header";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body className={`${vazirmatn.variable} font-vazirmatn antialiased`}>
        <UserProvider>
          <Providers>
            <Toaster containerClassName="text-right" />
            <Header />
            {children}
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}
