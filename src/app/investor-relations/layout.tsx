import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Relations | EASYFLYNSTAY",
  description:
    "Operational highlights, why invest, and contact for EASYFLYNSTAY — reach invest@easyflynstay.com.",
  openGraph: {
    title: "Investor Relations | EASYFLYNSTAY",
    description:
      "Investor highlights and how to reach EASYFLYNSTAY at invest@easyflynstay.com.",
  },
};

export default function InvestorRelationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
