import React from 'react';
import Hero from '../components/Hero';
import FeaturedAgents from '../components/FeaturedAgents';
import Categories from '../components/Categories';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Stats from '../components/Stats';
import CallToAction from '../components/CallToAction';
import CommunityBanner from '../components/CommunityBanner';
import { featuredAgents, trendingAgents, categories } from '../data/agents';

const Home: React.FC = () => {
  return (
    <div>
      <CommunityBanner />
      <Hero />
      
      <Stats />
      
      <FeaturedAgents 
        agents={featuredAgents}
        title="Featured Agents"
        subtitle="Discover our handpicked selection of the most powerful and versatile AI agents available on the marketplace."
        linkText="View all featured agents"
        linkUrl="/featured"
      />
      
      <Categories categories={categories} />
      
      <HowItWorks />
      
      <FeaturedAgents 
        agents={trendingAgents}
        title="Trending Now"
        subtitle="See what's popular in the community. These agents are currently trending based on trading volume and user activity."
        linkText="View all trending agents"
        linkUrl="/trending"
      />
      
      <Features />
      
      <CallToAction />
    </div>
  );
};

export default Home;
