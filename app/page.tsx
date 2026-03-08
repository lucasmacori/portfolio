import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ArticlesSection from '@/components/sections/ArticlesSection';
import ResumeSection from '@/components/sections/ResumeSection';
import NetworkSection from '@/components/sections/NetworkSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import KonamiCode from '@/components/KonamiCode';
import ScrollProgress from '@/components/ScrollProgress';
import ParticleBackground from '@/components/ParticleBackground';
import BackToTop from '@/components/BackToTop';

async function getPublicRepos(): Promise<number | null> {
  try {
    const res = await fetch('https://api.github.com/users/lucasmacori', {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data.public_repos ?? null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const publicRepos = await getPublicRepos();
  return (
    <div className="min-h-screen bg-[#0D0D0D] overflow-x-hidden relative">
      <ParticleBackground />
      <ScrollProgress />
      <CustomCursor />
      <KonamiCode />
      <BackToTop />
      <Navigation />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ArticlesSection />
        <ResumeSection />
        <NetworkSection publicRepos={publicRepos} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
