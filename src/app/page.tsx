import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
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
      {/* Top Fixed Navigation */}
      <Navbar activeTab="Home" />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Interactive Digital Portfolio Magazine */}
      <MagazineSection />

      {/* Milestones & Achievements */}
      <AchievementsSection />

      {/* Modern Footer */}
      <Footer />
    </main>
  );
}
