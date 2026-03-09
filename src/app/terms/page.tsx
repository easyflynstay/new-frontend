import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-heading text-4xl font-semibold text-foreground">Terms of Service</h1>
          <p className="mt-6 text-muted-foreground">Terms and conditions will be integrated here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
