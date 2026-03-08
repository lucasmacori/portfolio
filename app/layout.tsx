import type { Metadata } from 'next';
import '../styles/globals.css';
import Providers from '@/components/Providers';

const BASE_URL = 'https://lucasmacori.fr';
const TITLE = 'Lucas Macori | Full-Stack Developer';
const DESCRIPTION =
  "Portfolio of Lucas Macori — Full-Stack Developer building things that weren't supposed to exist yet.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: '%s | Lucas Macori',
  },
  description: DESCRIPTION,
  keywords: [
    'Lucas Macori',
    'Full-Stack Developer',
    'Java',
    'TypeScript',
    'React',
    'Next.js',
    'Spring Boot',
    'Kubernetes',
    'GCP',
    'SFEIR',
    'Lille',
  ],
  authors: [{ name: 'Lucas Macori', url: BASE_URL }],
  creator: 'Lucas Macori',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'fr_FR',
    url: BASE_URL,
    siteName: 'Lucas Macori',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/profile-edited.jpg',
        alt: 'Lucas Macori — Full-Stack Developer',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Lucas Macori',
  url: BASE_URL,
  image: `${BASE_URL}/profile-edited.jpg`,
  email: 'lucas.macori@gmail.com',
  jobTitle: 'Lead Full-Stack Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'SFEIR',
    url: 'https://www.sfeir.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lille',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://github.com/lucasmacori',
    'https://www.linkedin.com/in/lucas-macori-56b445223',
    'https://www.sfeir.dev/author/lucas/',
  ],
  knowsAbout: [
    'Java',
    'TypeScript',
    'React',
    'Next.js',
    'Spring Boot',
    'Kubernetes',
    'Google Cloud Platform',
    'Terraform',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
