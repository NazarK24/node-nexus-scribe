import React, { useState } from 'react';
import { ChevronRight, Check, Star, ArrowRight, Mail, Github, X, Eye, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HeroGraphDemo } from '@/components/HeroGraphDemo';
import { PricingCard } from '@/components/PricingCard';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';

const Home = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      role: 'Product Manager',
      company: 'TechCorp',
      content: 'KnowledgeGraph transformed how our team collaborates. The visual connections between our documents have revealed insights we never knew existed.',
      rating: 5
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'Research Director',
      company: 'Innovation Labs',
      content: 'The ability to execute code directly in our documentation has streamlined our research process. It\'s like having a notebook and IDE in one place.',
      rating: 5
    },
    {
      name: 'Emma Wilson',
      role: 'Engineering Manager',
      company: 'StartupXYZ',
      content: 'Real-time collaboration with graph visualization is a game-changer. Our team knowledge is now truly connected and accessible.',
      rating: 5
    }
  ];

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Auth attempt:', { email, password, isLogin });
    // TODO: Implement actual auth logic
    setShowRegistrationModal(false);
  };

  const handleGetStarted = () => {
    setShowRegistrationModal(true);
  };

  const closeModal = () => {
    setShowRegistrationModal(false);
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Header */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          KnowledgeGraph
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="rounded-xl">
            <a href="/help">Help</a>
          </Button>
          <Button variant="ghost" className="rounded-xl">
            <a href="/blog">Blog</a>
          </Button>
          <Button onClick={handleGetStarted} className="rounded-xl shadow-neumorphic hover:shadow-neumorphic-large">
            Sign In
          </Button>
        </div>
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
                  The collaborative knowledge management platform that combines graph visualization with real-time editing and code execution.
                </p>
              </div>
              
              {/* Value Proposition */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700">Real-time collaborative editing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Interactive knowledge graphs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-gray-700">Code execution in documents</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="group px-8 py-4 rounded-3xl shadow-neumorphic-large hover:shadow-neumorphic transition-all duration-300 animate-subtle-pulse hover:animate-none"
                  style={{ 
                    backgroundColor: '#a2d5f2',
                    borderRadius: '24px',
                    color: 'white'
                  }}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-4 rounded-3xl shadow-neumorphic hover:shadow-neumorphic-large transition-all duration-300"
                >
                  <Eye className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Join 10,000+ users</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">4.9/5 rating</span>
                </div>
              </div>
            </div>

            {/* Hero Graph Demo */}
            <div className="max-w-4xl mx-auto">
              <HeroGraphDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need to manage knowledge</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help teams collaborate, organize, and discover insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-neumorphic">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Visual Knowledge Graphs</h3>
              <p className="text-gray-600">
                See how your ideas connect with interactive graph visualization that reveals hidden relationships.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-neumorphic">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-time Collaboration</h3>
              <p className="text-gray-600">
                Work together seamlessly with live editing, comments, and instant synchronization across devices.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-neumorphic">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Code Execution</h3>
              <p className="text-gray-600">
                Run Python, JavaScript, and R code directly in your documents for interactive analysis and prototyping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by teams worldwide</h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about KnowledgeGraph
            </p>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
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
              Join thousands of teams already using KnowledgeGraph to organize their knowledge and accelerate their work.
            </p>
            <Button 
              size="lg"
              onClick={handleGetStarted}
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-2xl shadow-neumorphic-large hover:shadow-neumorphic transition-all duration-200 font-semibold"
            >
              Start Your Free Account
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Registration Modal - Centered */}
      {showRegistrationModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div 
            className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-neumorphic-large border border-white/50 w-full max-w-md mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {isLogin ? 'Welcome Back' : 'Get Started Free'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-200"
                  required
                  autoFocus
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              
              <Button 
                type="submit"
                className="w-full py-3 rounded-2xl font-semibold shadow-neumorphic hover:shadow-neumorphic-large transition-all duration-200"
                style={{ 
                  backgroundColor: '#a2d5f2',
                  borderRadius: '24px',
                  color: 'white'
                }}
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
                style={{ borderRadius: '24px' }}
              >
                <Mail className="w-5 h-5 mr-2" />
                Continue with Google
              </Button>
              <Button 
                variant="outline"
                className="w-full py-3 rounded-2xl border-2 hover:bg-white/50 transition-all duration-200 shadow-neumorphic hover:shadow-neumorphic-large"
                style={{ borderRadius: '24px' }}
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
      )}
    </div>
  );
};

export default Home;