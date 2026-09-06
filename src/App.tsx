import { useState, useEffect } from 'react';
import { Preloader } from '@/components/Preloader';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/sections/Hero';
import { LatestVideos } from '@/components/sections/LatestVideos';
import { ContentExploration } from '@/components/sections/ContentExploration';
import { DragonBallArea } from '@/components/sections/DragonBallArea';
import { Community } from '@/components/sections/Community';
import { Membership } from '@/components/sections/Membership';
import { MemberDashboard } from '@/components/sections/MemberDashboard';
import { About } from '@/components/sections/About';
import { Events } from '@/components/sections/Events';
import { Collaborate } from '@/components/sections/Collaborate';
import { Footer } from '@/components/Footer';
import { useLenis } from '@/hooks/useLenis';

function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  useEffect(() => {
    if (loaded) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [loaded]);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <div className={loaded ? 'opacity-100' : 'opacity-0'} style={{ transition: 'opacity 0.6s ease' }}>
        <Navigation />
        <main>
          <Hero />
          <LatestVideos />
          <ContentExploration />
          <DragonBallArea />
          <Community />
          <Membership />
          <MemberDashboard />
          <About />
          <Events />
          <Collaborate />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
