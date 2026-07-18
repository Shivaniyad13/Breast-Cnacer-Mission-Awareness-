"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ribbon,
  Stethoscope,
  ClipboardCheck,
  FileText,
  HeartHandshake,
  Layers,
  Activity,
  Sparkles,
  Info,
  CheckCircle2,
  Play,
  Pause,
  Maximize,
  Volume2,
  VolumeX,
  ShieldCheck,
  Plus,
  Minus,
  ArrowRight,
  Heart,
  Video,
  Clock
} from "lucide-react";

export default function DiagnosisPage() {
  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying); 
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleFaqToggle = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Stepper timeline data
  const processSteps = [
    {
      step: "Step 1",
      title: "Self Breast Examination (BSE)",
      desc: "Perform monthly self-checks at home to inspect for visual changes, unusual dimpling, or texture differences. Recognizing normal breast patterns makes detecting foreign lumps easier.",
      icon: Sparkles
    },
    {
      step: "Step 2",
      title: "Clinical Breast Examination",
      desc: "A physician or certified healthcare provider performs a physical examination during routine checks to identify abnormal tissues or hard node segments.",
      icon: Stethoscope
    },
    {
      step: "Step 3",
      title: "Mammography Screening",
      desc: "Low-dose X-ray plates take detailed images of internal tissue structure. It can highlight microcalcifications and deep growths long before they are physically palpable.",
      icon: Layers
    },
    {
      step: "Step 4",
      title: "Ultrasound (if required)",
      desc: "If dense breast tissue is present or a suspicious lump is found, high-frequency sound waves help determine if the mass is a fluid-filled cyst or a solid tissue growth.",
      icon: Activity
    },
    {
      step: "Step 5",
      title: "MRI Scan (if required)",
      desc: "Strong magnetic waves map comprehensive, multi-angle 3D profiles. MRI scans are reserved for staging confirmed cancer, assessing implant integrity, or screening high-risk patients.",
      icon: ShieldCheck
    },
    {
      step: "Step 6",
      title: "Biopsy",
      desc: "If solid lesions are confirmed, a clinician extracts minor tissue cells via a core needle or aspiration to check for cancer under a clinical microscope.",
      icon: ClipboardCheck
    },
    {
      step: "Step 7",
      title: "Pathology Report",
      desc: "Laboratory pathologists analyze the biopsy sample to determine grading, cell growth rate, and hormone receptor markers (ER, PR, and HER2 receptor status).",
      icon: FileText
    },
    {
      step: "Step 8",
      title: "Final Diagnosis & Treatment Planning",
      desc: "Oncologists synthesize all scan and pathology data to design a custom treatment blueprint combining surgery, clinical drugs, and holistic recuperation.",
      icon: HeartHandshake
    }
  ];

  // Machine card data
  const machines = [
    {
      name: "Mammography Machine",
      purpose: "Early detection of calcifications and micro-lumps.",
      desc: "Uses low-dose X-ray imaging technology to inspect breast tissue. It compresses the breast gently between plates to obtain clear, high-resolution internal tissue views.",
      icon: Layers,
      highlight: "Standard screening gold standard"
    },
    {
      name: "Breast Ultrasound Machine",
      purpose: "Differentiating cystic structures from solid tumors.",
      desc: "Employs high-frequency sonic waves that bounce off internal structures. Excellent for younger women, dense breasts, or validating palpable lumps.",
      icon: Activity,
      highlight: "Radiation-free imaging supplementary check"
    },
    {
      name: "Breast MRI Scanner",
      purpose: "Advanced staging, surgical mapping, and high-risk checks.",
      desc: "Uses strong magnets and radio waves to construct cross-sectional 3D images of soft tissues. Provides exceptional contrast clarity.",
      icon: ShieldCheck,
      highlight: "High sensitivity staging diagnostic"
    },
    {
      name: "Digital Breast Tomosynthesis (3D Mammography)",
      purpose: "Uncovering hidden tumors in complex dense tissue layers.",
      desc: "An advanced version of mammography that takes multiple quick images from different angles to construct a detailed 3D slice view of the breast.",
      icon: Sparkles,
      highlight: "State-of-the-art 3D tissue scanning"
    },
    {
      name: "Biopsy Equipment",
      purpose: "Definitive cellular pathology analysis.",
      desc: "Comprises specialized needle systems (vacuum-assisted or core needle) used to retrieve tissue samples under imaging guidance for biopsy confirmation.",
      icon: ClipboardCheck,
      highlight: "Confirmatory cell laboratory check"
    }
  ];

  // FAQ data
  const faqs = [
    {
      q: "Is mammography painful?",
      a: "Most women experience mild discomfort or pressure during compression, which is necessary to spread the tissue and get clear images. The discomfort lasts only a few seconds per view."
    },
    {
      q: "When should women start screening?",
      a: "Standard guidelines recommend annual or biennial mammograms starting at age 40. Women with a family history or genetic indicators should consult their doctor about starting screenings earlier."
    },
    {
      q: "Is ultrasound better than mammography?",
      a: "They serve different purposes. Mammography is the primary screening tool proven to reduce mortality. Ultrasound is a diagnostic follow-up tool used to evaluate specific areas or dense breast tissue."
    },
    {
      q: "What happens during a biopsy?",
      a: "Under local anesthesia, a doctor uses a needle guided by ultrasound or mammography to collect tiny tissue samples. The procedure is quick, minimally invasive, and causes little discomfort."
    },
    {
      q: "Can breast cancer be detected early?",
      a: "Yes. Early detection through regular BSE, clinical exams, and scheduled mammograms can detect cancer at Stage I, where treatment is highly successful and survival rates exceed 98%."
    }
  ];

  return (
    <div className="flex-1 w-full bg-white text-slate-800 font-sans selection:bg-pink-100 selection:text-pink-700 overflow-x-hidden">

      {/* ================================================
          1. HERO SECTION
         ================================================ */}
      <section className="relative bg-gradient-to-b from-rose-50/30 via-white to-rose-50/20 py-20 md:py-28 overflow-hidden border-b border-rose-100/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider"
              >
                <Ribbon className="h-3.5 w-3.5 text-pink-500 animate-pulse" />
                Early Screening Guide
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight"
              >
                Breast Cancer <br />
                <span className="text-pink-600">Diagnosis</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Early detection saves lives. Learn about the diagnostic tests, processes, and state-of-the-art technologies used to detect and confirm breast cancer.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="pt-2 flex justify-center lg:justify-start gap-4"
              >
                <a href="#early-diagnosis-matters">
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-full shadow-md px-6 cursor-pointer">
                    Explore Guidelines
                  </Button>
                </a>
                <a href="#video-section">
                  <Button variant="outline" className="border-slate-200 hover:bg-slate-50 font-semibold rounded-full px-6 cursor-pointer">
                    Watch Demo Video
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* Hero Right Image Illustration */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute -inset-2 bg-gradient-to-tr from-pink-400 to-rose-300 rounded-3xl opacity-10 blur-2xl z-0" />
              <div className="relative aspect-square w-72 sm:w-80 rounded-3xl overflow-hidden border border-pink-100/60 shadow-xl bg-white p-2">
                <Image
                  src="/images/mammography_screening.png"
                  alt="Medical Mammography Diagnostic Screening"
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================
          2. WHY EARLY DIAGNOSIS MATTERS
         ================================================ */}
      <section id="early-diagnosis-matters" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Graphic representation */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative aspect-[4/3] w-full max-w-sm rounded-3xl overflow-hidden border border-slate-100 shadow-lg">
                <Image
                  src="/images/preventive_wellness.png"
                  alt="Why Screening Recommendations Matter"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
              </div>
            </div>

            {/* Right: Informative details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold uppercase tracking-wider">
                <Info className="h-3 w-3" /> Importance of Detection
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Why Early Diagnosis Matters
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Detecting breast cancer at its earliest stage drastically alters the prognosis. When tumors are identified at localized stages (Stage I), the five-year survival rate is close to <strong>99%</strong>.
                </p>
                <p>
                  Scheduled medical screening scans can recognize microscopic tissue growth long before clinical symptoms—such as physical lumps, pain, or skin dimpling—manifest. This early visibility gives oncologists more treatment options and reduces the need for aggressive chemotherapy.
                </p>
              </div>

              {/* Grid of Key Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-800">Survival Rates Up</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Stage I localized cancer yields a 99% recovery rate.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-800">Less Aggressive Care</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Minimizes the requirement for full mastectomies or chemo cycles.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-800">Annual Checkups</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Recommended annually or biennially starting at age 40.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-800">High-Risk Screening</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Essential for BRCA mutation carriers or family oncology records.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================
          3. DIAGNOSTIC MACHINES
         ================================================ */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-12">

          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full inline-block">
              Clinical Equipment
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-slate-900">
              Diagnostic Machines & Technologies
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Discover the clinical technology and high-resolution imaging tools utilized by oncologists to look inside breast tissues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.map((mac, idx) => {
              const Icon = mac.icon;
              return (
                <Card key={idx} className="p-6 bg-white border-slate-100 hover:border-pink-200 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between rounded-2xl group">
                  <div className="space-y-4">
                    <div className="h-10 w-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-slate-800 text-base group-hover:text-pink-600 transition-colors">
                        {mac.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
                        Purpose: {mac.purpose}
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed pt-1.5">
                        {mac.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-50 text-[10px] font-bold text-emerald-700 bg-emerald-50/50 px-2 py-1 rounded-lg text-center">
                    {mac.highlight}
                  </div>
                </Card>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================================================
          4. BREAST CANCER DIAGNOSIS PROCESS
         ================================================ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-16">

          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full inline-block">
              Workflow Pipeline
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-slate-900">
              The Complete Diagnostic Journey
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              A detailed phase-by-phase timeline mapping screening checkups to pathology validation and final clinical treatment plans.
            </p>
          </div>

          {/* Stepper Timeline */}
          <div className="relative border-l border-dashed border-pink-200 ml-4 sm:ml-8 space-y-12">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative pl-8 sm:pl-12 group">

                  {/* Step Dot Badge */}
                  <div className="absolute -left-[17px] top-1 h-8 w-8 rounded-full bg-white border border-pink-200 flex items-center justify-center text-pink-600 shadow-xs group-hover:border-pink-500 group-hover:scale-105 transition-all">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-2xs hover:border-pink-200 hover:shadow-xs transition-all duration-300 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold text-pink-600 uppercase tracking-wider">
                      <span>{step.step}</span>
                      <span className="text-[9px] text-slate-400 font-semibold">Phase {idx + 1}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================================================
          5. EDUCATIONAL VIDEO SECTION
         ================================================ */}
      <section id="video-section" className="py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">

          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
              <Video className="h-3 w-3" /> Video Guide
            </div>
            <h2 className="font-heading text-3xl font-bold text-slate-800">
              Watch How Breast Cancer Diagnosis Works
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
              Explore the early detection and self-examination video instructions. Watch this step-by-step clinical walkthrough.
            </p>
          </div>

          {/* Interactive Custom Video Player Container */}
          <div className="relative max-w-3xl mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group/player aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/videoplayback.mp4"
              playsInline
              preload="metadata"
              onClick={togglePlay}
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-between text-white w-full">

                {/* Play/Pause & Mute Toggle */}
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="hover:text-pink-400 transition-colors cursor-pointer" title={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white" />}
                  </button>
                  <button onClick={toggleMute} className="hover:text-pink-400 transition-colors cursor-pointer" title={isMuted ? "Unmute" : "Mute"}>
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                </div>

                {/* Progress metadata label */}
                <span className="text-[10px] tracking-wider uppercase font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Diagnostic Walkthrough
                </span>

                {/* Fullscreen Button */}
                <button onClick={handleFullscreen} className="hover:text-pink-400 transition-colors cursor-pointer" title="Fullscreen">
                  <Maximize className="h-5 w-5" />
                </button>

              </div>
            </div>

            {/* Floating Play Indicator when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/35 pointer-events-none">
                <div className="h-16 w-16 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-lg transform scale-100 hover:scale-105 transition-transform">
                  <Play className="h-7 w-7 fill-white translate-x-0.5" />
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ================================================
          6. IMPORTANT TIPS CARD
         ================================================ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Card className="bg-gradient-to-br from-rose-500/10 via-white to-pink-500/5 border border-pink-100/70 p-6 sm:p-10 rounded-3xl shadow-lg relative overflow-hidden">

            {/* Aesthetic Ribbon overlay */}
            <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 opacity-5 pointer-events-none">
              <Ribbon className="h-44 w-44 text-pink-500" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold uppercase tracking-wider">
                <Info className="h-3.5 w-3.5" /> Clinical Guidance Tips
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">
                Early Detection & Screening Practices
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    <strong>Perform monthly self-examinations (BSE)</strong> to keep check of normal tissue layouts and notice variations early.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    <strong>Get regular clinical mammograms</strong> annually or biennially after the clinician-recommended age thresholds.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    <strong>Consult a specialist immediately</strong> if you detect any unusual hard lump, dimple, skin changes, or structural variations.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="h-5 w-5 text-pink-600 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    <strong>Never ignore signs</strong> like isolated breast pain, atypical nipple discharge, or spontaneous visual skin puckering.
                  </p>
                </div>
              </div>
            </div>

          </Card>
        </div>
      </section>

      {/* ================================================
          7. FAQ SECTION
         ================================================ */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full inline-block">
            Screening FAQs
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-100 rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:border-pink-200"
              >
                <button
                  onClick={() => handleFaqToggle(idx)}
                  className="w-full flex justify-between items-center p-5 text-left font-semibold text-slate-800 text-sm sm:text-base cursor-pointer hover:bg-slate-50/30"
                >
                  <span>{item.q}</span>
                  <div className="h-6 w-6 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center transition-transform">
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100 bg-slate-50/30 text-xs sm:text-sm text-slate-500 p-5 leading-relaxed"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================
          8. CALL TO ACTION (CTA)
         ================================================ */}
      <section className="py-24 bg-gradient-to-b from-rose-500/10 via-white to-rose-50/30 text-center relative border-t border-rose-100/30">
        <div className="container mx-auto px-4 max-w-3xl space-y-6">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full inline-block">
            Support Lives
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Early Detection Can Save Lives
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
            Take proactive steps today. Explore clinical guides, join awareness webinars, or contribute to diagnostic treatment checkups for rural patients.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link href="/webinars" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white rounded-full px-6 flex items-center justify-center gap-2 cursor-pointer">
                Book a Webinar
              </Button>
            </Link>
            <Link href="/donate" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-6 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/10">
                Donate Now
              </Button>
            </Link>
            <Link href="/treatment" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 flex items-center justify-center gap-2 cursor-pointer">
                Learn About Treatment
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
