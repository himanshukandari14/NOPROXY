'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from '@/components/Footer';
import { HeroHighlightDemo } from '@/components/HeroHighlightDemo';
import Navbar from '@/components/Navbar';
import { CanvasRevealEffectDemo } from '@/components/CanvasRevealEffectDemo';
import { SparklesPreview } from '@/components/SparklesPreview';

import React from 'react';

const page = () => {
  return (
    <>
      <Navbar />
      <SparklesPreview />

      <Link href='/attendance' className="flex justify-center">
        <Button className="py-9 px-5 text-[30px]" variant="outline">Mark Attendance</Button>
      </Link>

      <HeroHighlightDemo />
      <CanvasRevealEffectDemo />
      <Footer />
    </>
  );
}

export default page;
