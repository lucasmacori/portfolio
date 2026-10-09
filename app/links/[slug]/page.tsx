import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import SkipLink from '@/components/SkipLink';
import LinkPageContent from '../link-page-content';
import pages from '../pages.json';

type PageData = (typeof pages)[number];

export function generateStaticParams() {
  return pages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((entry) => entry.slug === slug);

  return {
    title: page?.title.en ?? 'Links',
    robots: { index: false, follow: false },
  };
}

export default async function LinkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages.find((entry) => entry.slug === slug) as PageData | undefined;

  if (!page) notFound();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-[#E8E8E8]">
      <SkipLink />
      <Navigation compact />
      <LinkPageContent page={page} />
    </div>
  );
}
