import { type FC } from "react";
import { useTheme } from "next-themes";
import { Inter } from "next/font/google";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropDownMenu";
import Button from "./ui/Button";
import Icons from "./Icons";

const inter = Inter({ subsets: ["latin"] });

const ThemeToggle: FC = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          <Icons.Sun className="rotate-0 scale-100 transition-all hover:text-slate-900 dark:-rotate-90 dark:scale-0 dark:text-slate-400 dark:hover:text-slate-100" />
          <Icons.Moon className="absolute rotate-90 scale-0 transition-all hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount className={inter.className}>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Icons.Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Icons.Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Icons.Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
