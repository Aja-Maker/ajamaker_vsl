'use client';

import Image from 'next/image';
import LeftContent from '@/components/makercash/LeftContent';
import RightForm from '@/components/makercash/RightForm';

import { getGoogleAccessToken } from '@/lib/google/getAccessToken';

export default function MakerCashPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] px-4 pb-12 pt-2 flex flex-col items-center">
      <div className="w-full max-w-5xl mb-2 px-2">
        <Image
          src="/makercash/logo.svg"
          alt="MakerCash logo"
          width={80}
          height={48}
          className=""
          priority
        />
      </div>

      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start lg:items-stretch">
          <LeftContent />
          <RightForm />
        </div>
      </div>
    </main>
  );
}
