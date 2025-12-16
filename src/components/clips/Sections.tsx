'use client';

import CTAButton from '@/components/vsl/CTAButton';

interface SectionProps {
  onCtaClick: () => void;
}

const sectionBase = 'rounded-3xl border border-[#1F2937] bg-[#0B0E16] text-white px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]';

export function ClipsHero({ onCtaClick }: SectionProps) {
  return (
    <section className={`${sectionBase} text-center space-y-4`}>
      <p className="text-xs uppercase tracking-[0.4em] text-[#FACC15]">premium drops</p>
      <h1 className="text-3xl font-semibold leading-tight">100,000+ VIRAL Luxury Lifestyle Reels Pack</h1>
      <p className="text-base text-white/80">Instant download · 75% off</p>
      {/* <CTAButton onClick={onCtaClick} variant="gradient" /> */}
    </section>
  );
}

export function ClipsVideo({ onCtaClick }: SectionProps) {
  return (
    <section className={`${sectionBase} space-y-4`}>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#F97316]">see inside</p>
        <h2 className="text-xl font-semibold">What will you get?</h2>
        <p className="text-sm text-white/70">Watch below.</p>
      </div>
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
        <div className="relative w-full pb-[56.25%]">
          <iframe
            src="https://player.vimeo.com/video/1086211660?h=ffea09936a&title=0&byline=0&portrait=0"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
      <CTAButton onClick={onCtaClick} variant="gradient" label='GET ACCESS' />
    </section>
  );
}

export function ClipsPricing({ onCtaClick }: SectionProps) {
  return (
    <section className={`${sectionBase} text-center space-y-3`}>
      <p className="text-xs uppercase tracking-[0.3em] text-[#FACC15]">Limited Offer</p>
      <h2 className="text-2xl font-semibold">Get the entire pack for $10</h2>
      <p className="text-sm text-white/70">
        Regular price <span className="line-through">$40</span> — today only <span className="font-semibold">$10</span> (75% off)
      </p>
      <div className="flex items-center justify-center gap-3">
        <span className="text-3xl font-semibold text-white">$10</span>
        <span className="text-xs uppercase tracking-[0.2em] text-white/60 bg-white/10 px-3 py-1 rounded-full">one-time</span>
      </div>
      <CTAButton onClick={onCtaClick} variant="gradient" label='GET ACCESS'/>
    </section>
  );
}

export function ClipsAudience({ onCtaClick }: SectionProps) {
  const items = [
    'Entrepreneurs & Business Influencers',
    'Luxury & Motivation pages',
    'Personal Brand Builders',
    'Social Media Managers',
    'Youtube shorts creators',
  ];
  return (
    <section className={sectionBase}>
      <h2 className="text-xl font-semibold mb-3">Perfect for luxury style content</h2>
      <ul className="space-y-2 text-sm text-white/80">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="text-[#F97316] mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {/* <CTAButton onClick={onCtaClick} className="mt-6" /> */}
    </section>
  );
}

export function ClipsBenefits({ onCtaClick }: SectionProps) {
  const benefits = [
    'Post daily luxury reels with zero editing',
    'Boost engagement and brand image',
    'Perfect for motivational and money niche creators',
    'Save hours, upload instantly',
    'Go viral with stylish aesthetic visuals',
  ];
  return (
    <section className={sectionBase}>
      <h2 className="text-xl font-semibold mb-3">Why you&apos;ll love it</h2>
      <ul className="space-y-2 text-sm text-white/80">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3">
            <span className="text-[#FACC15] text-lg">★</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      {/* <CTAButton onClick={onCtaClick} className="mt-6" /> */}
    </section>
  );
}

export function ClipsReviews({ onCtaClick }: SectionProps) {
  const reviews = [
    'Great! Definitely worth the money',
    'Loads of good ideas for everyone.',
    'I just love all these reels and pretty awesome!',
    'Everything went very well 10/10',
  ];
  return (
    <section className={`${sectionBase} space-y-4`}>
      <div>
        <p className="uppercase text-xs tracking-[0.3em] text-[#F97316]">Social proof</p>
        <h2 className="text-xl font-semibold">They&apos;re obsessed with the pack</h2>
      </div>
      <div className="grid gap-4">
        {reviews.map((review) => (
          <div key={review} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-1 text-[#FACC15] mb-2">
              {'★★★★★'.split('').map((star, index) => (
                <span key={`${review}-${index}`}>★</span>
              ))}
            </div>
            <p className="text-sm text-white/80">{review}</p>
          </div>
        ))}
      </div>
      {/* <CTAButton onClick={onCtaClick} className="mt-2" /> */}
    </section>
  );
}

export function ClipsBonus({ onCtaClick }: SectionProps) {
  const bonuses = [
    'YouTube Tips to Increase Reach & Ad Revenue',
    'TikTok Ads Mastery: How to Create Viral Campaigns that Sell',
    'Instagram Masterclass: Build, Engage and Grow Your Audience',
    'Hit 100K Views on Instagram: The Proven Roadmap',
    'How to use the gallery',
  ];
  return (
    <section className={`${sectionBase} border-[#F97316]`}>
      <p className="text-xs uppercase tracking-[0.4em] text-[#F97316]">Bonus inside</p>
      <h2 className="text-2xl font-semibold mt-2">Receive our exclusive gifts just for you!</h2>
      <p className="text-sm text-white/70 mt-2">Valued at $200+, included free with your purchase.</p>
      <ul className="space-y-2 text-sm mt-4 text-white/85">
        {bonuses.map((bonus) => (
          <li key={bonus} className="flex items-start gap-2">
            <span className="text-[#F97316] mt-1">+</span>
            <span className="font-semibold text-white">{bonus}</span>
          </li>
        ))}
      </ul>
      {/* <CTAButton onClick={onCtaClick} className="mt-6" /> */}
    </section>
  );
}

export function ClipsTerms({ onCtaClick }: SectionProps) {
  const terms = `Last Updated: 15/12/2025

By purchasing, accessing, or using this product, you agree to be bound by the following Terms and Conditions. If you do not agree with any part of these Terms, do not purchase or use this product.

1. Nature of the Product

This product provides temporary access to a collection of digital video files (“Content”) made available via a third-party cloud storage platform (e.g., Google Drive).

You acknowledge and agree that:

You are purchasing access, not ownership.

Access is provided “as is” and “as available.”

2. Ownership Disclaimer

The seller is NOT the owner, creator, or copyright holder of the Content.

All rights, ownership, and control of the Content belong to the original owner(s).

The seller does not claim any intellectual property rights over the Content.

The seller acts solely as a facilitator of access.

3. Third-Party Hosting & Availability

The Content is hosted on a third-party platform not owned, operated, or controlled by the seller.

You expressly acknowledge that:

The original owner or hosting provider may remove, restrict, modify, or terminate access to the Content at any time, with or without notice.

The seller has no control over the availability, duration, or continued existence of the Content.

Access may be temporary, limited, or discontinued at any moment.

4. Buyer Responsibility to Download

Upon receiving access, it is solely your responsibility to:

Download any and all Content you wish to keep.

Securely store the downloaded files on your own devices or storage systems.

If you fail to download the Content before access is revoked, removed, or restricted for any reason, the seller has no obligation and no ability to restore access or provide replacement files.

5. No Guarantees of Ongoing Access

The seller makes no guarantees regarding:

The duration of access

The number of files available at any given time

The permanence of the Content

Future updates, replacements, or re-uploads

Access may end at any time, for any reason, without compensation.

6. No Refund Policy (Strict)

ALL SALES ARE FINAL.

You expressly agree that:

There are no refunds, no chargebacks, and no exchanges under any circumstances.

This includes, but is not limited to:

Loss of access

Removal of Content

Dissatisfaction with the Content

Failure to download files in time

Technical issues beyond the seller’s control

By completing your purchase, you waive any right to dispute or reverse the payment.

7. Limitation of Liability

To the maximum extent permitted by law:

The seller shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from:

Use or inability to use the Content

Loss of access

Removal of files

Third-party actions

The seller’s total liability, if any, shall never exceed the amount paid for access.

8. No Warranty

The Content is provided without warranties of any kind, express or implied, including but not limited to:

Merchantability

Fitness for a particular purpose

Non-infringement

Availability or completeness

9. User Acceptance of Risk

By purchasing this product, you explicitly acknowledge and accept that:

You understand the seller is not the owner.

You understand access may end at any time.

You accept full responsibility for downloading and storing the Content.

You accept that no refunds will be issued for any reason.

10. Changes to Terms

The seller reserves the right to modify these Terms and Conditions at any time. Continued use of the product constitutes acceptance of the updated Terms.

11. Governing Law

These Terms shall be governed and interpreted in accordance with the laws of the seller’s jurisdiction, without regard to conflict of law principles.`;

  return (
    <section className={`${sectionBase} space-y-4`}>
      <h2 className="text-xl font-semibold">TERMS AND CONDITIONS</h2>
      <div className="text-xs leading-relaxed text-white/75 whitespace-pre-wrap">{terms}</div>
      {/* <CTAButton onClick={onCtaClick} className="mt-4" /> */}
    </section>
  );
}

export function ClipsFinalAck({ onCtaClick }: SectionProps) {
  return (
    <section className={`${sectionBase} text-center`}>
      <p className="text-xs uppercase tracking-[0.4em] text-[#FACC15]">Final acknowledgment</p>
      <h2 className="text-2xl font-semibold my-4">By purchasing and accessing this product, you confirm that you have read, understood, and agreed to all the above Terms and Conditions in full.</h2>
      <p className="text-[10px] text-white/70 mt-3">
        If you bought and encounter an error contact{' '}
        <a href="mailto:dmaditative.state@gmail.com" className="underline text-[#F97316]">
          dmaditative.state@gmail.com
        </a>{' '}
        to receive your access
      </p>
      {/* <CTAButton onClick={onCtaClick} variant="gradient" /> */}
    </section>
  );
}
