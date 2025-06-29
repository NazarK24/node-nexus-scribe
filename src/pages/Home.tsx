
import React, { useState } from 'react';
import { ChevronRight, Check, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroGraphDemo } from '@/components/HeroGraphDemo';
import { PricingCard } from '@/components/PricingCard';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';

const Home = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for individuals getting started',
      features: [
        '1GB storage',
        '1 project',
        'Basic graph visualization',
        'Markdown editor',
        'Community support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'Ideal for professionals and small teams',
      features: [
        '15GB storage',
        '10 projects',
        '10 collaborators',
        'Code execution',
        'Advanced graph features',
        'Priority support'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations with advanced needs',
      features: [
        'Unlimited storage',
        'Unlimited projects',
        '100+ collaborators',
        'GPU code execution',
        'SSO integration',
        'Dedicated support'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Research Scientist',
      company: 'Stanford University',
      content: 'KnowledgeGraph transformed how I organize my research. The visual connections help me discover patterns I never noticed before.',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'Product Manager',
      company: 'Tech Startup',
      content: 'Our team collaboration improved 300% after switching to KnowledgeGraph. The real-time editing is seamless.',
      rating: 5
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Data Scientist',
      company: 'Fortune 500',
      content: 'The code execution feature is a game-changer. I can prototype and document in the same place.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Organize knowledge
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    like never before
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Combine the power of graph visualization with collaborative editing and code execution. 
                  Your ideas, connected and alive.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl shadow-neumorphic-large hover:shadow-neumorphic transition-all duration-200 animate-pulse hover:animate-none"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 rounded-2xl border-2 hover:bg-white/50 transition-all duration-200 shadow-neumorphic hover:shadow-neumorphic-large"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Setup in 2 minutes</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <HeroGraphDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose your plan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free and scale as you grow. All plans include our core features with different limits and capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                isHovered={hoveredPlan === plan.name}
                onHover={setHoveredPlan}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by researchers and teams</h2>
            <p className="text-xl text-gray-600">
              Join thousands of users who've transformed their knowledge management
            </p>
          </div>

          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-neumorphic-large">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to revolutionize your workflow?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the knowledge graph revolution. Start organizing your ideas visually and collaboratively today.
            </p>
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-2xl shadow-neumorphic-large hover:shadow-neumorphic transition-all duration-200 font-semibold"
            >
              Start Your Free Account
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
