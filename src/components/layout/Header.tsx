"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Anchor } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Anchor className="h-8 w-8 text-sand" />
          <div>
            <span className="font-serif text-lg font-bold leading-tight">
              Whangarei Yacht Support
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 border-t border-white/10 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-4 py-3 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Anchor className="h-6 w-6 text-sand" />
              <span className="font-serif text-lg font-bold">{SITE.name}</span>
            </div>
            <p className="text-sm text-white/70">{SITE.tagline}</p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/yacht-guardianage" className="hover:text-white">Yacht Guardianage</Link></li>
              <li><Link href="/project-management" className="hover:text-white">Project Management</Link></li>
              <li><Link href="/accommodation" className="hover:text-white">Accommodation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>{SITE.phone}</li>
              <li><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
              <li>{SITE.address}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Hours</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>{SITE.hours.weekdays}</li>
              <li>{SITE.hours.saturday}</li>
              <li>{SITE.hours.sunday}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <Link href="/contact" className="hover:text-white">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
