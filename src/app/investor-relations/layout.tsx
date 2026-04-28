import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Relations | Easyflynstay",
  description:
    "Company overview, strategy, and investor resources for Easyflynstay — premium business and first class travel, headquartered in Bengaluru, India.",
  openGraph: {
    title: "Investor Relations | Easyflynstay",
    description:
      "Learn about Easyflynstay’s mission, market opportunity, and how to reach our team for investor and partnership inquiries.",
  },
};

export default function InvestorRelationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
