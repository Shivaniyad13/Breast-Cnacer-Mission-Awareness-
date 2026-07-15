import Link from "next/link";
import { Button } from "@/components/ui/button";

import AwarenessCarousel from "@/components/layout/AwarenessCarousel";
import {
  Ribbon,
  ShieldCheck,
  Award,
  Heart,
  ArrowRight,
  BookOpen,
  AlertCircle
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 min-h-[90vh] flex items-center justify-center">

        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/cancer video.webm" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Pink Dark Overlay */}
        <div className="absolute inset-0 bg-black/45"></div>

        {/* Pink Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/20 via-pink-800/10 to-background/90"></div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6 max-w-4xl pt-32 translate-y-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 backdrop-blur-md border border-pink-300/20 text-pink-100 text-xs font-semibold tracking-wider uppercase">
            <Ribbon className="h-4 w-4" />
            {/* GRS Pvt. Ltd. Awareness Campaign */}
          </div>

          <h1 className="mt-20 font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Connecting Communities for <br className="hidden sm:inline" />
            <span className="text-pink-300">
              Breast Cancer Mission
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
            A trusted unified healthcare portal. Spreading early physical diagnosis
            knowledge, hosting expert webinars, and coordinating verified
            crowdfunding support for patients.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">

            <Link href="/register">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white shadow-xl"
              >
                Join Campaign
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/campaigns">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white bg-white/10 backdrop-blur-md hover:bg-white/20"
              >
                Support Patients
              </Button>
            </Link>

          </div>

        </div>

      </section>



      {/* Module Overview cards */}
      <section className="py-20 sm:py-28 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            A Unified Platform For Awareness & Care
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Bringing together patients, medical experts, verified NGOs, and volunteer networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Awareness Hub</h3>
            <p className="text-sm text-muted-foreground flex-1">
              Access early detection physical test timers, interactive quizzes, and verified medical blogs written by licensed oncologists.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">FundLife Crowdfunding</h3>
            <p className="text-sm text-muted-foreground flex-1">
              Launch fundraising campaigns for cancer treatments. Contributions flow directly to hospital bank accounts to prevent fraud.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">NGO & Doctor Connect</h3>
            <p className="text-sm text-muted-foreground flex-1">
              Every campaign undergoes direct document reviews by registered NGOs, ensuring transparent fundraising channels.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">QR Certifications</h3>
            <p className="text-sm text-muted-foreground flex-1">
              Receive cryptographically signed PDF certificates upon quiz completions and webinar attendance with instant QR verification.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Organizations Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-blue-50/40 dark:from-slate-900 dark:to-slate-800/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 text-xs font-semibold uppercase tracking-widest">
              Backed By
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Our Partner Organizations
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Proudly supported by leading corporations committed to social responsibility and healthcare excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">

            {/* Card – GRS India Corporation */}
            <div className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-700/50 h-40 px-6 py-5 border-b border-slate-100 dark:border-slate-700">
                <img
                  src="/grs-group-logo.jpg"
                  alt="GRS India Corporation Logo"
                  className="max-h-24 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col flex-1 p-5 space-y-2">
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-800 dark:text-slate-100">
                  GRS India Pvt. Ltd.
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex-1">
                  Leading solar energy company providing erection, commissioning, installation, maintenance &amp; scientific consultancy services across India.
                </p>
                <a
                  href="https://grsindiacorporation.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors mt-2"
                >
                  Visit website <span aria-hidden>→</span>
                </a>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>

            {/* Card – Khushi Centre */}
            <div className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-700/50 h-40 px-6 py-5 border-b border-slate-100 dark:border-slate-700">
                <img
                  src="/khushi-logo.jpg"
                  alt="Khushi Centre for Rehabilitation & Research Logo"
                  className="max-h-24 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col flex-1 p-5 space-y-2">
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-800 dark:text-slate-100">
                  Khushi Centre for Rehabilitation &amp; Research
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex-1">
                  Dedicated to social responsibility, rehabilitation research, and sustainable community development initiatives.
                </p>
                <a
                  href="https://khushicentre.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors mt-2"
                >
                  Visit website <span aria-hidden>→</span>
                </a>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>

          </div>
        </div>
      </section>

      <AwarenessCarousel />

      {/* Medical Disclaimer section */}
      <section className="py-8 bg-destructive/5 border-t border-destructive/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl flex items-start gap-4 text-destructive">
          <AlertCircle className="h-6 w-6 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm">Medical Disclaimer & Guidelines</h4>
            <p className="text-xs leading-relaxed text-destructive/80">
              The content, interactive guidelines, and self-examination schedules provided on the GRS Breast Cancer Awareness Campaign Platform are intended solely for general education and public awareness. This platform does not provide clinical diagnostic reports or medical treatments. Please consult a registered oncologist or healthcare professional for professional clinical advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
