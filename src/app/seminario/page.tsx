'use client';

import { useState } from 'react';
import AccessFormDrawer from '@/components/vsl/AccessFormDrawer';
import CTAButton from '@/components/vsl/CTAButton';
import {
  SeminarHero,
  OpeningSection,
  SeminarVideoSection,
  SacredSpaceSection,
  ExperienceSection,
  MethodSection,
  DetailsSection,
  AudienceSection,
  TakeawaysSection,
  BonusSection,
  InvitationSection,
} from '@/components/vsl/SeminarioSections';

export default function MakerCashPage() {
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#0F172A] pb-32">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <SeminarHero onCtaClick={openForm} cta={false}/>
        <SeminarVideoSection onCtaClick={openForm} cta={true}/>
        <OpeningSection onCtaClick={openForm} cta={false}/>
        <SacredSpaceSection onCtaClick={openForm} cta={false}/>
        <ExperienceSection onCtaClick={openForm} cta={false}/>
        <MethodSection onCtaClick={openForm} cta={false}/>
        <DetailsSection onCtaClick={openForm} cta={false}/>
        <AudienceSection onCtaClick={openForm} cta={false}/>
        <TakeawaysSection onCtaClick={openForm} cta={false}/>
        <BonusSection onCtaClick={openForm} cta={false}/>
        <InvitationSection onCtaClick={openForm} cta={false}/>
      </div>

      <div className="fixed bottom-0 inset-x-0 px-4 pb-4 pt-2 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-xl border-t border-white/60">
        <CTAButton onClick={openForm} />
      </div>

      <AccessFormDrawer open={formOpen} onClose={closeForm} />
    </main>
  );
}
