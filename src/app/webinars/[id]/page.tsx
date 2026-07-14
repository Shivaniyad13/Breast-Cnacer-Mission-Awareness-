import { auth } from "@/auth";
import { getWebinarById } from "@/app/actions/webinars";
import WebinarJoinWidget from "@/components/webinars/WebinarJoinWidget";
import { Calendar, Clock, MapPin, Users, Award, ShieldCheck, Video, Globe, ChevronRight, HelpCircle, UserPlus, Info } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

export const revalidate = 0; // Dynamic rendering

interface WebinarDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function WebinarDetailsPage({ params }: WebinarDetailsPageProps) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const userId = session?.user?.id;

  const { id } = await params;
  const webinar = await getWebinarById(id);

  if (!webinar) {
    notFound();
  }

  const isRegistered = webinar.registrations.some((r) => r.userId === userId);
  const remainingSeats = Math.max(webinar.maxSeats - webinar.registrations.length, 0);

  // Format Dates
  const fullDateStr = new Date(webinar.date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const startTimeStr = new Date(webinar.startTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTimeStr = new Date(webinar.endTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Default FAQs
  const defaultFaqs = [
    {
      q: "Who should attend this webinar?",
      a: "This webinar is open to anyone wishing to learn about breast cancer prevention, self-examinations, and clinical guidelines. It is especially beneficial for student volunteers and family caregivers.",
    },
    {
      q: "How do I claim my certificate?",
      a: "You must attend the live webinar meeting inside the platform for at least 80% of its total duration. Once completed, your certificate will automatically generate and appear in Dashboard -> My Certificates.",
    },
    {
      q: "What tools do I need for this webinar?",
      a: "An active internet connection and a laptop or smartphone. The meeting room is fully embedded in our platform, so you do not need to install external apps like Zoom or Teams.",
    },
    {
      q: "Is registration free?",
      a: "Yes, all breast cancer awareness seminars conducted by GRS and Khushi Centre are completely free of charge to promote public health education.",
    },
  ];

  const faqs = (webinar.faqs as any[])?.length ? (webinar.faqs as any[]) : defaultFaqs;

  // Split Objectives & Agenda text
  const objectivesList = webinar.objectives
    ? webinar.objectives.split("\n").filter(Boolean)
    : [
        "Understand the early signs and symptoms of breast cancer",
        "Learn proper step-by-step techniques for monthly self breast exams",
        "Recognize risk factors and available diagnostic channels",
        "Empower student volunteers to run local awareness drives",
      ];

  const agendaList = webinar.agenda
    ? webinar.agenda.split("\n").filter(Boolean)
    : [
        "00:00 - Introduction & Welcome note",
        "00:15 - Clinical guidelines by Lead Oncologist",
        "00:45 - Practical Demonstration: Self Examinations",
        "01:05 - Strategic NGO partnerships explanation",
        "01:20 - Open Q&A Session",
      ];

  const isOffline = webinar.webinarMode.toLowerCase() === "offline" || webinar.webinarMode.toLowerCase() === "hybrid";

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 max-w-6xl">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
          <Link href="/webinars" className="hover:text-primary transition-colors">Webinars</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-700 line-clamp-1">{webinar.title}</span>
        </div>

        {/* Hero Section Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-pink-100/50 shadow-lg bg-gradient-to-r from-pink-100 to-rose-200 h-64 md:h-80 flex items-center justify-center">
          {webinar.bannerImage ? (
            <img src={webinar.bannerImage} alt={webinar.title} className="object-cover h-full w-full" />
          ) : (
            <div className="text-center text-primary/30 flex flex-col items-center">
              <Award className="h-24 w-24 stroke-[1.1] mb-2 animate-pulse" />
              <span className="text-xs uppercase font-extrabold tracking-widest text-primary/50">GRS Educational Platform</span>
            </div>
          )}

          {/* Banner Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent flex flex-col justify-end p-6 md:p-10">
            <div className="space-y-2 max-w-3xl">
              <div className="flex gap-2">
                <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {webinar.webinarMode}
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {webinar.category}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                {webinar.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview */}
            <div className="bg-white rounded-3xl border border-pink-50 p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="font-heading text-xl font-extrabold text-slate-800 border-b border-pink-50 pb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" /> Seminar Overview
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {webinar.fullContent || webinar.description}
              </p>
            </div>

            {/* Objectives */}
            <div className="bg-white rounded-3xl border border-pink-50 p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="font-heading text-xl font-extrabold text-slate-800 border-b border-pink-50 pb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" /> Key Learning Objectives
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-sm text-slate-600">
                {objectivesList.map((obj, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <span className="h-5 w-5 bg-pink-100 text-primary rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agenda */}
            <div className="bg-white rounded-3xl border border-pink-50 p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="font-heading text-xl font-extrabold text-slate-800 border-b border-pink-50 pb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Session Agenda
              </h2>
              <div className="relative border-l border-pink-100 ml-3 pl-6 space-y-6 py-2">
                {agendaList.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-primary border-4 border-white shadow-sm" />
                    <p className="text-sm font-semibold text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Map Mocks */}
            {isOffline && (
              <div className="bg-white rounded-3xl border border-pink-50 p-6 md:p-8 shadow-sm space-y-4">
                <h2 className="font-heading text-xl font-extrabold text-slate-800 border-b border-pink-50 pb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Venue Location
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-2 text-sm text-slate-600">
                    <p className="font-bold text-slate-800 text-base">{webinar.venue}</p>
                    <p>{webinar.city ? `${webinar.city}, ` : ""}{webinar.state ? `${webinar.state}, ` : ""}{webinar.country || "India"}</p>
                    <p className="text-xs text-muted-foreground italic mt-2">
                      Please carry a digital copy of your registration status on your dashboard for entry clearance.
                    </p>
                  </div>

                  <div className="border border-pink-100 rounded-2xl overflow-hidden shadow-sm relative h-40 bg-pink-50/30 flex flex-col justify-between p-4">
                    <svg className="absolute inset-0 w-full h-full text-pink-200/50 stroke-1 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="0" y1="50" x2="300" y2="50" stroke="currentColor" strokeWidth="2" />
                      <line x1="120" y1="0" x2="120" y2="200" stroke="currentColor" strokeWidth="2" />
                      <line x1="0" y1="120" x2="300" y2="120" stroke="currentColor" strokeWidth="3" />
                      <circle cx="120" cy="120" r="40" fill="currentColor" fillOpacity="0.1" />
                    </svg>
                    
                    <div className="z-10 flex justify-center pt-6">
                      <div className="h-10 w-10 bg-primary/10 border border-primary text-primary rounded-full flex items-center justify-center shadow-lg animate-bounce">
                        <Navigation className="h-5 w-5 fill-primary/20" />
                      </div>
                    </div>

                    <div className="z-10 bg-white/95 border border-pink-100/50 rounded-xl p-2 text-[10px] text-center shadow-sm font-bold text-slate-800">
                      Google Maps: {webinar.venue} Pinpoint
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FAQs */}
            <div className="bg-white rounded-3xl border border-pink-50 p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="font-heading text-xl font-extrabold text-slate-800 border-b border-pink-50 pb-3 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" /> Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-slate-100 pb-3.5 last:border-0 last:pb-0 space-y-1">
                    <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <span className="text-primary">Q.</span> {faq.q}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed pl-4">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Columns */}
          <div className="space-y-6">
            
            {/* Join Widget */}
            <WebinarJoinWidget
              webinarId={webinar.id}
              webinarTitle={webinar.title}
              startTimeStr={webinar.startTime.toISOString()}
              endTimeStr={webinar.endTime.toISOString()}
              isRegistered={isRegistered}
              isLoggedIn={isLoggedIn}
              currentUser={session?.user}
            />

            {/* Event Info Details */}
            <div className="bg-white rounded-3xl border border-pink-50 p-6 shadow-sm space-y-4 text-xs text-slate-600">
              <h3 className="font-heading text-sm font-bold text-slate-800 border-b border-pink-50 pb-2">Event Parameters</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Session Mode</span>
                  <span className="font-bold text-primary flex items-center gap-1"><Video className="h-3 w-3" /> {webinar.webinarMode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Total Duration</span>
                  <span className="font-bold text-slate-800">
                    {Math.max((webinar.endTime.getTime() - webinar.startTime.getTime()) / 60000, 30)} Minutes
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Registration Limit</span>
                  <span className="font-bold text-slate-800">{webinar.maxSeats} slots</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Seats Remaining</span>
                  <span className="font-bold text-slate-800">{remainingSeats} left</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Certification status</span>
                  <span className="font-bold text-emerald-600">✓ QR Verified</span>
                </div>
              </div>
            </div>

            {/* Speaker Bio Card */}
            <div className="bg-white rounded-3xl border border-pink-50 p-6 shadow-sm space-y-4">
              <h3 className="font-heading text-sm font-bold text-slate-800 border-b border-pink-50 pb-2">Instructing Speaker</h3>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-pink-100 flex items-center justify-center font-black text-primary overflow-hidden shrink-0 border border-pink-200">
                  {webinar.speakerImage ? (
                    <img src={webinar.speakerImage} alt={webinar.speakerName} className="object-cover h-full w-full" />
                  ) : (
                    webinar.speakerName.charAt(0)
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{webinar.speakerName}</h4>
                  <p className="text-[10px] text-muted-foreground">Certified Medical Instructor</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed whitespace-pre-line italic">
                {webinar.speakerBio || "Oncologist dedicated to public health and early detection awareness."}
              </p>
            </div>

            {/* Organizer Details */}
            <div className="bg-white rounded-3xl border border-pink-50 p-6 shadow-sm space-y-2.5 text-[10px] text-muted-foreground leading-relaxed">
              <h4 className="font-bold uppercase tracking-wider text-slate-700">Organizer Details</h4>
              <p>
                {webinar.organizerDetails || "This session is conducted by GRS Breast Cancer Campaign System and the Khushi Centre for Rehabilitation & Research."}
              </p>
              <p className="font-semibold text-slate-500">Support Desk: webinars@grsawareness.org</p>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}

// Add simple Navigation layout icon type check mock
function Navigation(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}
