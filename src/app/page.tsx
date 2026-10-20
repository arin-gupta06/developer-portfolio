import React from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TechStackTicker from '@/components/TechStackTicker';
import ProjectsSection from '@/components/ProjectsSection';
import MagazineSection from '@/components/MagazineSection';
import AchievementsSection from '@/components/AchievementsSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#090a0f',
        color: '#f8fafc',
      }}
    >
      {/* Brand Integrated Preloader */}
      <Preloader />

      {/* Top Fixed Navigation */}
      <Navbar activeTab="Home" />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Infinite Auto-Scrolling Tech Stack Strip */}
      <TechStackTicker />

      {/* Interactive 3D Stacked Deck & Live Project Dossier */}
      <ProjectsSection />

      {/* Interactive Digital Portfolio Magazine */}
      <MagazineSection />

      {/* Milestones & Achievements Dynamic Auto-Slider */}
      <AchievementsSection />

      {/* Modern Footer */}
      <Footer />
    </main>
  );
}
