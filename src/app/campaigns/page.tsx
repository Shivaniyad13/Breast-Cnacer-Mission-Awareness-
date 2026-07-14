"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { 
  Ribbon, 
  ChevronRight,
  ArrowRight,
  Sparkles,
  Wind,
  Apple,
  Sun,
  ShieldAlert,
  Activity,
  HeartPulse
} from "lucide-react";
import { motion } from "framer-motion";

const cancerTypes = [
  {
    id: "breast-cancer",
    title: "Breast Cancer",
    description: "Begins in breast tissues. It is one of the most common cancers diagnosed in women globally.",
    precautions: [
      "Perform monthly breast self-exams.",
      "Get clinical exams & mammograms.",
      "Maintain active exercise & healthy weight.",
      "Limit alcohol & avoid tobacco."
    ],
    icon: Ribbon,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    link: "/campaigns/breast-cancer"
  },
  {
    id: "lung-cancer",
    title: "Lung Cancer",
    description: "Starts in the lungs and is the leading cause of cancer deaths. Strongly linked to tobacco use.",
    precautions: [
      "Avoid smoking & secondhand smoke.",
      "Test home for radon exposure.",
      "Avoid occupational carcinogens.",
      "Keep living areas well-ventilated."
    ],
    icon: Wind,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "colorectal-cancer",
    title: "Colorectal Cancer",
    description: "Develops in the colon or rectum. Often begins as benign polyps that grow slowly over years.",
    precautions: [
      "Get screened regularly starting at 45.",
      "Eat fiber-rich fruits & vegetables.",
      "Limit red & processed meat consumption.",
      "Stay active & reduce alcohol intake."
    ],
    icon: Apple,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    id: "prostate-cancer",
    title: "Prostate Cancer",
    description: "Occurs in the prostate gland in men. It usually grows slowly and is highly treatable if caught early.",
    precautions: [
      "Discuss PSA screening with your doctor.",
      "Eat a diet rich in lycopene & tomatoes.",
      "Maintain a healthy body weight.",
      "Stay physically active regularly."
    ],
    icon: Activity,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    id: "skin-cancer",
    title: "Skin Cancer (Melanoma)",
    description: "Abnormal growth of skin cells, mostly triggered by exposure to ultraviolet (UV) radiation from sunlight.",
    precautions: [
      "Apply broad-spectrum SPF 30+ daily.",
      "Seek shade, especially during midday.",
      "Wear wide hats & UV-blocking sunglasses.",
      "Check skin monthly for changing moles."
    ],
    icon: Sun,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    id: "cervical-cancer",
    title: "Cervical Cancer",
    description: "Starts in the cells of the cervix, highly associated with persistent high-risk HPV infections.",
    precautions: [
      "Get vaccinated against HPV early.",
      "Schedule regular Pap & HPV screening.",
      "Practice safe personal hygiene.",
      "Avoid smoking to preserve immunity."
    ],
    icon: ShieldAlert,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
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
            <h3 className="font-heading text-2xl font-bold text-foreground">Common Cancer Types & Prevention</h3>
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
              {cancerTypes.length} Major Types
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cancerTypes.map((camp, idx) => {
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
                    <div className="space-y-2 pt-2 border-t border-border/50">
                      <span className="text-xs font-semibold text-foreground uppercase tracking-wider block">Precautions:</span>
                      <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                        {camp.precautions.map((prec, pIdx) => (
                          <li key={pIdx} className="leading-relaxed">
                            {prec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="pt-6 mt-auto">
                    {camp.link ? (
                      <Link href={camp.link}>
                        <Button variant="ghost" className="p-0 hover:bg-transparent text-primary text-xs font-bold tracking-wide uppercase flex items-center gap-1 group-hover:gap-1.5 transition-all">
                          Learn More & Support
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="ghost" className="p-0 hover:bg-transparent text-muted-foreground text-xs font-bold tracking-wide uppercase flex items-center gap-1 transition-all cursor-default">
                        Awareness Info Only
                      </Button>
                    )}
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
