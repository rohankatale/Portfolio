import React from 'react';
import { Section } from '../layout/Section';
import { Heading } from '../typography/Heading';
import { ScrollReveal } from '../animations/ScrollReveal';
import { siteConfig } from '../../data';
import {
  Code,
  Smartphone,
  PenTool,
  Layers,
} from 'react-feather';

const serviceIcons: { [key: string]: React.ReactNode } = {
  'Web Development': <Code size={28} className="text-accent" />,
  'App Development': <Smartphone size={28} className="text-accent" />,
  'UI/UX Design': <PenTool size={28} className="text-accent" />,
  'Prototyping': <Layers size={28} className="text-accent" />,
};

export const WhatIDoSection: React.FC = () => {
  return (
    <Section id="what-i-do" className="bg-dark-100 py-24 md:py-32">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <Heading level={2} className="font-display text-textPrimary text-center mb-4">
            <span className="text-accent">02.</span> What I Do
          </Heading>
          <p className="text-textSecondary text-center max-w-2xl mx-auto mb-12 md:mb-16">
            I build and design user-centric digital experiences, from responsive websites to intuitive mobile apps.
          </p>
        </ScrollReveal>

        {/* Centered grid with 3 columns on large screens and equal-height items */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr items-stretch">
            {siteConfig.services.map((service, index) => (
              <ScrollReveal key={index} delay={0.1 * index}>
                <div className="h-full">
                  <div
                    className="group relative h-full bg-dark-200/90 p-8 rounded-xl border border-dark-400/20 transition-all duration-300 
                               hover:border-accent/60 hover:shadow-[0_0_40px_rgba(78,154,241,0.45)] hover:scale-[1.02]
                               after:content-[''] after:absolute after:inset-0 after:rounded-xl after:pointer-events-none 
                               after:bg-[radial-gradient(ellipse_at_center,rgba(78,154,241,0.18),transparent_60%)] after:opacity-0 
                               group-hover:after:opacity-100">
                    <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-dark-300 ring-1 ring-dark-400/30 transition-all duration-300 group-hover:bg-accent/15 group-hover:ring-accent/60 group-hover:shadow-[0_0_20px_rgba(78,154,241,0.5)]">
                      {serviceIcons[service.title] || <Code size={28} className="text-accent" />}
                    </div>
                    <h3 className="font-display text-xl font-bold text-textPrimary mb-3">{service.title}</h3>
                    <p className="text-textSecondary leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
