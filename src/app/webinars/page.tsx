import { auth } from "@/auth";
import { getWebinars, getWebinarFilterMetadata } from "@/app/actions/webinars";
import WebinarFilters from "@/components/webinars/WebinarFilters";
import WebinarRegisterButton from "@/components/webinars/WebinarRegisterButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Award, ShieldCheck, Video, Globe, Navigation } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const revalidate = 0; // Fresh listing every visit

interface WebinarsPageProps {
  searchParams: Promise<{
    search?: string;
    city?: string;
    category?: string;
    date?: string;
    mode?: "upcoming" | "past";
  }>;
}

export default async function WebinarsPage({ searchParams }: WebinarsPageProps) {
  const session = await auth();
  const userId = session?.user?.id;

  const resolvedParams = await searchParams;
  const filters = {
    search: resolvedParams.search || "",
    city: resolvedParams.city || "all",
    category: resolvedParams.category || "all",
    date: resolvedParams.date || "",
    mode: resolvedParams.mode || "upcoming",
  };

  // Fetch webinars and filter options
  const webinars = await getWebinars(filters);
  const { cities, categories } = await getWebinarFilterMetadata();

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 min-h-screen">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-primary border border-pink-200 uppercase tracking-widest">
          <Video className="h-3 w-3 animate-pulse" /> Certified Learning & Events
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
          Breast Cancer Awareness <span className="text-primary bg-gradient-to-r from-primary to-rose-400 bg-clip-text text-transparent">Webinars</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Join medical professionals, oncologists, and volunteers in live sessions. Attend at least 80% of any certified webinar to receive a cryptographically verifiably signed certificate.
        </p>
      </div>

      {/* Filter Control Box */}
      <WebinarFilters cities={cities} categories={categories} />

      {/* Webinar Cards Grid */}
      {webinars.length === 0 ? (
        <div className="text-center bg-white/40 border border-pink-100 rounded-3xl p-16 shadow-inner space-y-4">
          <div className="text-pink-300 flex justify-center">
            <Globe className="h-16 w-16 stroke-[1.5]" />
          </div>
          <h3 className="font-heading text-xl font-bold text-slate-700">No Webinars Found</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            We couldn't find any webinars matching your current filters. Try relaxing your filters or check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webinars.map((webinar) => {
            const isRegistered = webinar.registrations.some((r) => r.userId === userId);
            const remainingSeats = Math.max(webinar.maxSeats - webinar.registrations.length, 0);
            const isCompleted = webinar.status === "COMPLETED" || new Date(webinar.endTime) < new Date();

            // Format dates
            const dateStr = new Date(webinar.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            const timeStr = new Date(webinar.startTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });
            const endTimeStr = new Date(webinar.endTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });

            // Action form for registering (replaced by Client Component button)

            return (
              <Card
                key={webinar.id}
                className="group flex flex-col bg-white hover:shadow-xl transition-all duration-300 rounded-3xl border border-pink-50/50 overflow-hidden relative"
              >
                {/* Banner Section */}
                <div className="relative h-48 w-full bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 flex items-center justify-center overflow-hidden">
                  {webinar.bannerImage ? (
                    <img
                      src={webinar.bannerImage}
                      alt={webinar.title}
                      className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-center text-primary/30 flex flex-col items-center">
                      <Award className="h-16 w-16 stroke-[1.2] mb-1 animate-pulse" />
                      <span className="text-[10px] uppercase font-bold tracking-widest text-primary/50">Live Event</span>
                    </div>
                  )}

                  {/* Mode & Category Badge */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/80 backdrop-blur-md border border-pink-100/50 text-[10px] font-bold text-primary px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Globe className="h-3 w-3" /> {webinar.webinarMode}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="bg-slate-900/70 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {webinar.category}
                    </span>
                  </div>

                  {isCompleted && (
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-slate-900 text-white font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-slate-700 shadow-md">
                        Event Completed
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                    <Calendar className="h-3.5 w-3.5" /> {dateStr}
                    <span className="text-slate-300">|</span>
                    <Clock className="h-3.5 w-3.5" /> {timeStr} - {endTimeStr}
                  </div>
                  <CardTitle className="text-xl font-extrabold text-slate-800 line-clamp-1 group-hover:text-primary transition-colors mt-1.5">
                    {webinar.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                    {webinar.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-5 pt-0 flex-1 flex flex-col justify-between space-y-4">
                  {/* Speaker & Location details */}
                  <div className="space-y-3 border-y border-pink-50/50 py-3.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-pink-100 flex items-center justify-center font-bold text-primary overflow-hidden shrink-0">
                        {webinar.speakerImage ? (
                          <img src={webinar.speakerImage} alt={webinar.speakerName} className="object-cover h-full w-full" />
                        ) : (
                          webinar.speakerName.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{webinar.speakerName}</p>
                        <p className="text-[10px] text-muted-foreground">Expert Speaker</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-700">{webinar.venue || "Online"}</span>
                        {webinar.city && (
                          <span className="text-slate-500">
                            , {webinar.city}, {webinar.state ? `${webinar.state}, ` : ""}{webinar.country || "India"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Seat limits & Action Button */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-slate-500">
                      {!isCompleted ? (
                        <div className="flex items-center gap-1">
                          <Users className="h-4.5 w-4.5 text-primary" />
                          <div>
                            <span className="font-bold text-slate-800">{remainingSeats}</span> seats left
                          </div>
                        </div>
                      ) : (
                        <span className="italic text-slate-400">Library materials available</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/webinars/${webinar.id}`}>
                        <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 rounded-full text-xs font-semibold px-4 py-1.5 h-auto">
                          Details
                        </Button>
                      </Link>

                      {!isCompleted && (
                        isRegistered ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 select-none">
                            <ShieldCheck className="h-3.5 w-3.5" /> Registered
                          </span>
                        ) : (
                          <WebinarRegisterButton
                            webinarId={webinar.id}
                            webinarTitle={webinar.title}
                            currentUser={session?.user}
                            buttonText="Register"
                            className="bg-primary hover:bg-primary/95 text-white rounded-full text-xs font-bold px-4 py-1.5 h-auto transition-transform active:scale-95 shadow-sm"
                          />
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
