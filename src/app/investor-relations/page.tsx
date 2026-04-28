"use client";
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function InvestorRelationsPage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  }, [])
  return null;
}