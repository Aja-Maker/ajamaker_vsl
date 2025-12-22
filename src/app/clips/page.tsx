'use client';

import { useState } from 'react';
import CTAButton from '@/components/vsl/CTAButton';
import PaymentFormDrawer from '@/components/clips/PaymentFormDrawer';
import PaymentForm from '@/components/clips/PaymentForm';
import {
  ClipsHero,
  ClipsVideo,
  ClipsPricing,
  ClipsAudience,
  ClipsBenefits,
  ClipsReviews,
  ClipsBonus,
  ClipsTerms,
  ClipsFinalAck,
} from '@/components/clips/Sections';

export default function ClipsPage() {
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  return (
    <main className="min-h-screen bg-[#02040A] text-white pb-32">
      <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
        <ClipsHero onCtaClick={openForm} />
        <ClipsVideo onCtaClick={openForm} />
        <ClipsPricing onCtaClick={openForm} />
        <ClipsAudience onCtaClick={openForm} />
        <ClipsBenefits onCtaClick={openForm} />
        <ClipsReviews onCtaClick={openForm} />
        <ClipsBonus onCtaClick={openForm} />
        <ClipsTerms onCtaClick={openForm} />
        <ClipsFinalAck onCtaClick={openForm} />
      </div>

      <div className="fixed bottom-0 inset-x-0 px-4 pb-4 pt-2 bg-gradient-to-t from-black via-black/60 to-transparent backdrop-blur-xl border-t border-white/10">
        <CTAButton onClick={openForm} variant="gradient" label='OBTENER ACCESO'/>
      </div>

      <PaymentFormDrawer open={formOpen} onClose={closeForm}>
        <PaymentForm onSuccess={closeForm} />
      </PaymentFormDrawer>
    </main>
  );
}
