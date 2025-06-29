
import React, { useState } from 'react';
import { ChevronRight, Check, Star, ArrowRight, Mail, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HeroGraphDemo } from '@/components/HeroGraphDemo';
import { PricingCard } from '@/components/PricingCard';

const Home = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Auth attempt:', { email, password, isLogin });
    // TODO: Implement actual auth logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Header */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          KnowledgeGraph
        </div>
        <Button 
          variant="outline" 
          className="px-6 py-2 rounded-2xl border-2 hover:bg-white/50 transition-all duration-200 shadow-neumorphic hover:shadow-neumorphic-large"
        >
          Open App
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Organize Knowledge.
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Connect Ideas.
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Obsidian meets Google Docs for teams. Real-time collaborative editing with bi-directional linking and code execution.
                </p>
              </div>
              
              {/* Value Proposition */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Real-time collaborative editing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Bi-directional linking with graphs</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Code execution in documents</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl shadow-neumorphic-large hover:shadow-neumorphic transition-all duration-200 animate-pulse hover:animate-none"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Registration Window */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {isLogin ? 'Welcome Back' : 'Start Your Free Trial'}
                </h3>
                <p className="text-gray-600">
                  {isLogin ? 'Sign in to your account' : 'No credit card required'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-200"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold shadow-neumorphic hover:shadow-neumorphic-large transition-all duration-200"
                >
                  {isLogin ? 'Sign In' : 'Start Free Trial'}
                </Button>
              </form>

              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-gray-500 text-sm">or</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="outline"
                  className="w-full py-3 rounded-2xl border-2 hover:bg-white/50 transition-all duration-200 shadow-neumorphic hover:shadow-neumorphic-large"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Continue with Google
                </Button>
                <Button 
                  variant="outline"
                  className="w-full py-3 rounded-2xl border-2 hover:bg-white/50 transition-all duration-200 shadow-neumorphic hover:shadow-neumorphic-large"
                >
                  <Github className="w-5 h-5 mr-2" />
                  Continue with GitHub
                </Button>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline text-sm"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">See it in action</h2>
          <p className="text-xl text-gray-600 mb-12">
            Watch how ideas connect and grow in real-time
          </p>
          <div className="max-w-4xl mx-auto">
            <HeroGraphDemo />
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
