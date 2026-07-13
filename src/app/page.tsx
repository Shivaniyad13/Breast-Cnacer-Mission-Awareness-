import Link from "next/link";
import { Button } from "@/components/ui/button";
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
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase animate-pulse">
            <Ribbon className="h-4 w-4" />
            GRS Pvt. Ltd. Awareness Campaign
          </div>
          
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Connecting Communities for <br className="hidden sm:inline" />
            <span className="text-primary bg-clip-text">Breast Cancer Awareness</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-normal">
            A trusted unified healthcare portal. Spreading early physical diagnosis knowledge, hosting expert webinars, and coordinating verified crowdfunding support for patients.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]">
                Join as Advocate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/campaigns">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/20 text-primary hover:bg-primary/5 font-semibold">
                Support Patients
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/10 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl -translate-y-1/2 -z-10" />
        <div className="absolute top-1/3 right-1/10 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl -translate-y-1/3 -z-10" />
      </section>

      {/* Impact Stats Grid */}
      <section className="border-y border-border bg-muted/20 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-extrabold text-primary tracking-tight font-heading">100,000+</p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Individuals Educated</p>
            </div>
            <div className="space-y-2 border-y sm:border-y-0 sm:border-x border-border/60 py-6 sm:py-0">
              <p className="text-4xl font-extrabold text-primary tracking-tight font-heading">100%</p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Verified Campaigns</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-extrabold text-primary tracking-tight font-heading">₹50L+</p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Direct Hospital Payouts</p>
            </div>
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
