import type { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { cn } from "~/utils/cn";
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main
      className={cn("bg-white text-slate-900 antialiased", inter.className)}
    >
      <div className="min-h-screen bg-slate-50 antialiased dark:bg-slate-900">
        <Navbar />
        {props.children}

        <Toaster position="bottom-right" />

        {/* increased height on mobile */}
        <div className="h-40 md:hidden" />
      </div>
    </main>
  );
};
