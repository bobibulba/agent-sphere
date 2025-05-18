import React from 'react';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import CallToAction from '../components/CallToAction';
import CommunityBanner from '../components/CommunityBanner';
import WhatIsAgentSphere from '../components/WhatIsAgentSphere';
import Categories from '../components/Categories';
import { categories as categoriesData } from '../data/agents';

const Home: React.FC = () => {
  return (
    <div>
      <CommunityBanner />
      <Hero />
      <WhatIsAgentSphere />
      <Categories categories={categoriesData} />
      <Partners />
      <CallToAction />
    </div>
  );
};

export default Home;
