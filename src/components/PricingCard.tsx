
import React from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  isHovered: boolean;
  onHover: (planName: string | null) => void;
}

export const PricingCard = ({ plan, isHovered, onHover }: PricingCardProps) => {
  return (
    <div 
      className={`relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 transition-all duration-300 cursor-pointer border border-white/50 ${
        plan.popular 
          ? 'shadow-neumorphic-large ring-2 ring-primary/20 scale-105' 
          : 'shadow-neumorphic hover:shadow-neumorphic-large'
      } ${isHovered ? 'scale-105 shadow-2xl' : ''}`}
      onMouseEnter={() => onHover(plan.name)}
      onMouseLeave={() => onHover(null)}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 shadow-neumorphic">
            <Star className="w-4 h-4" />
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
          {plan.price !== 'Custom' && <span className="text-gray-500 ml-1">/{plan.period}</span>}
        </div>
        <p className="text-gray-600">{plan.description}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Button 
        className={`w-full py-3 rounded-2xl font-semibold transition-all duration-200 ${
          plan.popular 
            ? 'bg-primary hover:bg-primary/90 text-white shadow-neumorphic-large' 
            : 'bg-white/80 hover:bg-white text-gray-900 shadow-neumorphic hover:shadow-neumorphic-large'
        }`}
      >
        {plan.cta}
      </Button>
    </div>
  );
};
