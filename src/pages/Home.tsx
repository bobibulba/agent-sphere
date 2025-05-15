import React from 'react';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import CallToAction from '../components/CallToAction';
import CommunityBanner from '../components/CommunityBanner';
import WhatIsAgentSphere from '../components/WhatIsAgentSphere';

const Home: React.FC = () => {
  return (
    <div>
      <CommunityBanner />
      <Hero />
      <WhatIsAgentSphere />
      <Partners />
      <CallToAction />
    </div>
  );
};

export default Home;
