"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { 
  Ribbon, 
  HeartPulse, 
  GraduationCap, 
  Sprout, 
  Flame, 
  Globe, 
  ChevronRight,
  ArrowRight,
  Sparkles,
  Beef
} from "lucide-react";
import { motion } from "framer-motion";

const campaigns = [
  {
    id: "healthcare",
    title: "Healthcare Programme",
    description: "Providing clean diagnostic camps, free clinical checkups, and secondary medical consultations to remote rural sectors.",
    icon: HeartPulse,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    id: "education",
    title: "Education & Literacy",
    description: "Sponsoring school supplies, establishing evening tutorial centers, and providing secondary school scholarships to children.",
    icon: GraduationCap,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "agriculture",
    title: "Agriculture Welfare",
    description: "Educating local farmers on water-resilient crop cycles, organic inputs, and direct-to-consumer digital channels.",
    icon: Sprout,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    id: "livestock",
    title: "Livestock Management",
    description: "Veterinary consulting clinics, vaccine camp drives, and fodder management strategies for rural cattle owners.",
    icon: Beef,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: "disaster",
    title: "Disaster Rehabilitation",
    description: "Active emergency relief teams delivering foods, medicines, and clean rebuilding materials during flooding and drafts.",
    icon: Flame,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    id: "sustainability",
    title: "Sustainability Interventions",
    description: "Developing local solar grids, micro rainwater harvesting pools, and community-wide solid waste recycling bins.",
    icon: Globe,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
];

export default function CampaignsPage() {
  return (
    <div className="flex-1 w-full bg-gradient-to-b from-muted/50 to-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hub Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Khushi Centre Initiatives
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground"
          >
            Our Active Campaigns & Programmes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg"
          >
            Khushi&apos;s initiatives are evidence-based and guided by a holistic vision of Peace, Prosperity, and Resilience. Support or volunteer for our featured campaigns below.
          </motion.p>
        </div>

        {/* FEATURED: Breast Cancer Awareness Campaign */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-6 sm:p-10 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          {/* Decorative pink gradient background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10 group-hover:scale-110 transition-transform duration-500" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Highlight Callout Detail */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                <Ribbon className="h-4 w-4" />
                Featured Highlight Campaign
              </span>
              
              <div className="space-y-3">
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  Breast Cancer Awareness Campaign
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Join our international-grade healthcare campaign. We are spreading crucial physical self-examination guidelines, organizing free clinical screening camps, and raising verified medical funds for underprivileged patient treatments.
                </p>
              </div>

              {/* Progress Bar Widget */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm font-semibold">
                  <span className="text-muted-foreground">Collected: <strong className="text-foreground">₹6,20,000</strong></span>
                  <span className="text-primary">Goal: ₹15,00,000</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden border border-border">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "41.3%" }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                    className="h-full bg-primary rounded-full" 
                  />
                </div>
                <p className="text-xs text-muted-foreground italic">
                  * 41% raised from 240+ verified donors. Direct hospital disbursement transfers.
                </p>
              </div>

              {/* Action Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/campaigns/breast-cancer">
                  <Button className="bg-primary hover:bg-primary/95 text-white font-semibold shadow-md active:scale-95 transition-all">
                    View Campaign Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/campaigns/breast-cancer#donate">
                  <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-semibold active:scale-95 transition-all">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Campaign Visual Mock Illustration */}
            <div className="lg:col-span-5 flex items-center justify-center p-4">
              <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/5 border border-primary/10 w-full max-w-sm text-center space-y-4 shadow-inner">
                <Ribbon className="h-16 w-16 text-primary mx-auto animate-pulse" />
                <div className="space-y-1">
                  <p className="text-lg font-bold text-foreground">Together We Can Fight</p>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Breast Cancer Campaign</p>
                </div>
                <div className="py-2 border-t border-border flex justify-around text-xs font-semibold">
                  <div>
                    <p className="text-primary font-bold text-base">500+</p>
                    <p className="text-muted-foreground text-[10px]">RSVP&apos;d</p>
                  </div>
                  <div className="border-x border-border/80 px-4">
                    <p className="text-primary font-bold text-base">100%</p>
                    <p className="text-muted-foreground text-[10px]">Audited</p>
                  </div>
                  <div>
                    <p className="text-primary font-bold text-base">₹50L</p>
                    <p className="text-muted-foreground text-[10px]">Pledges</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* REDESIGNED: Grid of Other Active Campaigns */}
        <div className="space-y-8">
          <div className="border-b border-border pb-4 flex justify-between items-end">
            <h3 className="font-heading text-2xl font-bold text-foreground">All Campaigns & Interventions</h3>
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              {campaigns.length} Active Programmes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((camp, idx) => {
              const Icon = camp.icon;
              return (
                <motion.div
                  key={camp.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx + 0.3 }}
                  className="group flex flex-col justify-between p-6 rounded-2xl border border-border bg-card shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className={`h-11 w-11 rounded-xl ${camp.bgColor} flex items-center justify-center ${camp.color} transition-transform group-hover:scale-110`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {camp.title}
                      </h4>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {camp.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 mt-auto">
                    <Button variant="ghost" className="p-0 hover:bg-transparent text-primary text-xs font-bold tracking-wide uppercase flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      Read More
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
