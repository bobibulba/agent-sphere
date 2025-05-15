import React from 'react';
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import CallToAction from '../components/CallToAction';
import CommunityBanner from '../components/CommunityBanner';
import WhatIsAgentSphere from '../components/WhatIsAgentSphere';
import FeaturedAgents from '../components/FeaturedAgents';
import Categories from '../components/Categories';
import { featuredAgents as featuredAgentsData, categories as categoriesData } from '../data/agents';

const Home: React.FC = () => {
  return (
    <div>
      <CommunityBanner />
      <Hero />
      <WhatIsAgentSphere />
      <FeaturedAgents 
        agents={featuredAgentsData}
        title="Featured Agents"
        subtitle="Discover our handpicked selection of top-performing AI agents ready to help with your tasks."
        linkText="View all agents"
        linkUrl="/marketplace"
      />
      <Categories categories={categoriesData} />
      <Partners />
      <CallToAction />
    </div>
  );
};

export default Home;
