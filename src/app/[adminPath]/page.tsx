"use client";

import { useParams, notFound } from "next/navigation";
import { AdminPanel } from "@/components/admin/AdminPanel";

/** Long default path if NEXT_PUBLIC_ADMIN_PATH is not set. Change via env or run `npm run generate-admin-path` before build. */
const DEFAULT_ADMIN_PATH = "k9x2m7p4q8w1e5r3t6y0u2a4s8f2h6";

export default function AdminPathPage() {
  const params = useParams();
  const requestedPath = typeof params.adminPath === "string" ? params.adminPath : "";
  const secretPath = typeof process.env.NEXT_PUBLIC_ADMIN_PATH === "string" && process.env.NEXT_PUBLIC_ADMIN_PATH.trim()
    ? process.env.NEXT_PUBLIC_ADMIN_PATH.trim()
    : DEFAULT_ADMIN_PATH;

  if (requestedPath !== secretPath) {
    notFound();
    return null;
  }

  return <AdminPanel />;
}
