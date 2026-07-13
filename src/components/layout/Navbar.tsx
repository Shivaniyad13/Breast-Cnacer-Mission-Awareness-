import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Ribbon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  // Sign out server action
  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Ribbon className="h-6 w-6 text-primary animate-pulse" />
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              Breast Cancer <span className="text-primary">Mission Awareness</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/campaigns"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Campaigns
          </Link>
          <Link
            href="/learn"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Awareness Hub
          </Link>
          <Link
            href="/webinars"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Webinars
          </Link>
        </nav>

        {/* Dynamic Auth State Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="relative inline-flex items-center justify-center h-9 rounded-full px-3 text-sm font-semibold hover:bg-accent hover:text-accent-foreground border border-border cursor-pointer transition-colors bg-transparent select-none">
                {user.name || user.email}
                <span className="ml-2 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  {user.role}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard" className="cursor-pointer w-full block">Dashboard</Link>
                </DropdownMenuItem>
                {user.role === "ADMIN" && (
                  <DropdownMenuItem>
                    <Link href="/admin" className="cursor-pointer text-primary font-medium w-full block">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <form action={handleSignOut} className="w-full m-0 p-0">
                    <button className="w-full text-left text-destructive font-medium cursor-pointer border-0 bg-transparent p-0 m-0 text-sm" type="submit">
                      Sign Out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary hover:bg-primary/95 text-white font-medium shadow-sm transition-transform active:scale-95">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
