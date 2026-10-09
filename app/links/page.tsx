import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import SkipLink from '@/components/SkipLink';
import LinksIndexContent from './links-index-content';
import pages from './pages.json';

export const metadata: Metadata = {
  title: 'Links',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LinksPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-[#E8E8E8]">
      <SkipLink />
      <Navigation compact />
      <LinksIndexContent pages={pages} />
    </div>
  );
}
