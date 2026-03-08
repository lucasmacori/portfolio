import type { Metadata } from 'next';
import '../styles/globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Lucas Macori | Full-Stack Developer',
  description: "Portfolio of Lucas Macori — Full-Stack Developer building things that weren't supposed to exist yet.",
  keywords: ['Lucas Macori', 'Full-Stack Developer', 'React', 'NextJS', 'SpringBoot', 'Kubernetes'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
