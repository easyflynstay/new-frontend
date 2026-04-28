import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "Track Booking", href: "/track-booking" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="EASYFLYNSTAY" width={40} height={40} className="h-10 w-10 rounded-none" />
              <h3 className="font-heading text-lg font-semibold">EASYFLYNSTAY</h3>
            </div>
            <p className="mt-3 text-sm text-white/80">Premium business and first class flight booking. Fly easy, stay easy.</p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase">Quick Links</h4>
            <ul className="mt-2 space-y-1 text-sm text-white/80">
              {footerLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className="hover:text-accent transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase">Contact</h4>
            <p className="mt-2 text-sm text-white/80">+91 7090005700</p>
            <p className="text-sm text-white/80">support@easyflynstay.com</p>
            <p className="mt-1 text-sm text-white/80">Ground Floor, Plot No: 128-P2, Near Ginger Hotel, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066</p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase">24/7 Concierge</h4>
            <p className="mt-2 text-sm text-white/80">We are here to help around the clock. Your comfort is our priority.</p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="flex h-8 w-8 items-center justify-center bg-white/10 text-white transition hover:bg-accent hover:text-primary" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center bg-white/10 text-white transition hover:bg-accent hover:text-primary" aria-label="Twitter">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center bg-white/10 text-white transition hover:bg-accent hover:text-primary" aria-label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            <Link href="/terms" className="hover:text-accent transition-colors">Terms &amp; Conditions</Link>
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/refund-cancellation" className="hover:text-accent transition-colors">Refund &amp; Cancellation Policy</Link>
            <Link href="/investor-relations" className="hover:text-accent transition-colors">Investor Relations</Link>
          </div>
          <p className="mt-4 text-center text-sm text-white/60">
            &copy; {new Date().getFullYear()} EASYFLYNSTAY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
