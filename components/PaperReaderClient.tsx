"use client";
import dynamic from 'next/dynamic';

// pdf.js touches browser-only APIs at import time, so the reader must never be
// server-rendered. `ssr: false` is only allowed inside a Client Component
// (Next.js 15+), hence this thin wrapper around the dynamic import.
const PaperReader = dynamic(() => import('@/components/PaperReader'), { ssr: false });

export default PaperReader;
