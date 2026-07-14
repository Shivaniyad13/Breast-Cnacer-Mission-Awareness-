import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebinarFeedbackForm from "@/components/webinars/WebinarFeedbackForm";
import WebinarCountdown from "@/components/webinars/WebinarCountdown";
import Link from "next/link";
import { 
  Heart, BookOpen, Award, Users, Video, Calendar, Clock, 
  MapPin, ShieldCheck, Download, ExternalLink, Activity, Bell, ListTodo
} from "lucide-react";

export const revalidate = 0; // Fresh dashboard information on every visit

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;
  const now = new Date();

  // Fetch Webinar Registrations
  const registrations = await db.webinarRegistration.findMany({
    where: { userId: user.id },
    include: {
      webinar: {
        include: {
          registrations: true,
        }
      }
    },
    orderBy: { registeredAt: "desc" },
  });

  // Fetch Attendance Records
  const attendanceLogs = await db.attendance.findMany({
    where: { userId: user.id },
    include: { webinar: true },
    orderBy: { createdAt: "desc" },
  });

  // Fetch Certificates
  const certificates = await db.certificate.findMany({
    where: { recipientId: user.id },
    orderBy: { createdAt: "desc" },
  });

  // Segregate webinars into Upcoming, Live, and Past
  const liveWebinars = registrations.filter(r => {
    const start = new Date(r.webinar.startTime);
    const end = new Date(r.webinar.endTime);
    return now >= start && now <= end && r.webinar.status === "PUBLISHED";
  });

  const upcomingWebinars = registrations.filter(r => {
    const start = new Date(r.webinar.startTime);
    return now < start && r.webinar.status === "PUBLISHED";
  });

  const pastWebinars = registrations.filter(r => {
    const end = new Date(r.webinar.endTime);
    return now > end || r.webinar.status === "COMPLETED";
  });

  // Dynamic notifications list
  const notifications: { title: string; message: string; date: Date; type: string }[] = [];
  
  registrations.forEach(r => {
    const start = new Date(r.webinar.startTime);
    const end = new Date(r.webinar.endTime);

    // 1. Registration Successful
    notifications.push({
      title: "Registration Successful",
      message: `You are officially registered for "${r.webinar.title}". Join details will unlock on ${start.toLocaleDateString()}.`,
      date: r.registeredAt,
      type: "SUCCESS"
    });

    // 2. Reminder 24 hours before
    const oneDayMs = 24 * 60 * 60 * 1000;
    const timeDiffMs = start.getTime() - now.getTime();
    if (timeDiffMs > 0 && timeDiffMs < oneDayMs) {
      notifications.push({
        title: "Reminder: 24 Hours Left",
        message: `"${r.webinar.title}" will start in less than 24 hours at ${start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}.`,
        date: new Date(start.getTime() - oneDayMs),
        type: "WARNING"
      });
    }

    // 3. Reminder 1 hour before
    const oneHourMs = 60 * 60 * 1000;
    if (timeDiffMs > 0 && timeDiffMs < oneHourMs) {
      notifications.push({
        title: "Reminder: 1 Hour Left",
        message: `"${r.webinar.title}" will start in less than 1 hour! Get ready to join.`,
        date: new Date(start.getTime() - oneHourMs),
        type: "WARNING"
      });
    }

    // 4. Webinar Live
    if (now >= start && now <= end && r.webinar.status === "PUBLISHED") {
      notifications.push({
        title: "Webinar Live Now",
        message: `"${r.webinar.title}" is currently live streaming! Join now to track attendance and receive your certificate.`,
        date: start,
        type: "LIVE"
      });
    }
  });

  // 5. Certificate Ready
  certificates.forEach(c => {
    notifications.push({
      title: "Certificate Ready",
      message: `Congratulations! Your cryptographic attendance certificate for "${c.eventName}" is ready to download.`,
      date: c.createdAt,
      type: "CERTIFICATE"
    });
  });

  // Sort notifications by date desc
  notifications.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6 min-h-screen">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-pink-100 pb-6">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-800">
            Welcome back, {user.name}
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your breast cancer awareness dashboard as a <span className="text-primary font-bold uppercase tracking-wider">{user.role}</span>
          </p>
        </div>
        <div className="flex gap-2">
          {user.role === "ADMIN" && (
            <Link href="/admin/webinars">
              <Button className="bg-primary text-white hover:bg-primary/90 font-bold rounded-xl transition-all">
                Go to Webinar Command Center
              </Button>
            </Link>
          )}
          <Link href="/webinars">
            <Button variant="outline" className="border-pink-200 text-slate-700 hover:bg-pink-50 rounded-xl font-bold">
              Browse Webinars
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Tab System */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-pink-50/50 border border-pink-100/50 p-1 rounded-xl">
          <TabsTrigger value="overview" className="font-bold text-xs uppercase py-2">
            <ListTodo className="h-4 w-4" /> Activity Overview
          </TabsTrigger>
          <TabsTrigger value="webinars" className="font-bold text-xs uppercase py-2">
            <Video className="h-4 w-4" /> Webinars ({registrations.length})
          </TabsTrigger>
          <TabsTrigger value="certificates" className="font-bold text-xs uppercase py-2">
            <Award className="h-4 w-4" /> Certificates ({certificates.length})
          </TabsTrigger>
          <TabsTrigger value="attendance" className="font-bold text-xs uppercase py-2">
            <Activity className="h-4 w-4" /> Attendance Logs
          </TabsTrigger>
          <TabsTrigger value="notifications" className="font-bold text-xs uppercase py-2 relative">
            <Bell className="h-4 w-4" /> Alerts
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-white text-[8px] font-black rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 rounded-3xl border border-pink-50 shadow-sm">
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
              <CardDescription>View your records, notifications, and approvals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-pink-50/10 border border-pink-100/50 text-sm">
                <p className="font-bold text-slate-800">Verification Status: Active</p>
                <p className="text-muted-foreground mt-1">
                  Your account is verified. You can access all features configured for your role on the network.
                </p>
              </div>
              
              {user.role === "VOLUNTEER" && (
                <div className="space-y-2 text-sm pt-2">
                  <p className="font-semibold text-primary flex items-center gap-1.5"><Award className="h-4 w-4" /> Earned Certificates</p>
                  <p className="text-muted-foreground">Complete the breast cancer awareness quiz or attend certified webinars to earn downloadable QR-verified certificates.</p>
                  <Link href="/learn/quiz" className="block"><Button variant="outline" size="sm" className="rounded-xl border-pink-200">Go to Quiz Engine</Button></Link>
                </div>
              )}

              {user.role === "PATIENT" && (
                <div className="space-y-2 text-sm pt-2">
                  <p className="font-semibold text-primary flex items-center gap-1.5"><Heart className="h-4 w-4" /> My Campaigns</p>
                  <p className="text-muted-foreground">No active crowdfunding campaigns found. Upload medical bills and request NGO endorsements to start fundraising.</p>
                  <Link href="/campaigns/create" className="block"><Button variant="outline" size="sm" className="rounded-xl border-pink-200">Create Campaign</Button></Link>
                </div>
              )}

              {user.role === "DOCTOR" && (
                <div className="space-y-2 text-sm pt-2">
                  <p className="font-semibold text-primary flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> Medical Publications</p>
                  <p className="text-muted-foreground">Publish oncologist-verified guidelines and physical test schedules to raise public awareness.</p>
                  <Link href="/learn/articles" className="block"><Button variant="outline" size="sm" className="rounded-xl border-pink-200">Write Article</Button></Link>
                </div>
              )}

              {user.role === "NGO_REP" && (
                <div className="space-y-2 text-sm pt-2">
                  <p className="font-semibold text-primary flex items-center gap-1.5"><Users className="h-4 w-4" /> Endorsement Requests</p>
                  <p className="text-muted-foreground">Audit patient registration files and verify bank accounts to endorse fundraising campaigns.</p>
                  <Link href="/dashboard" className="block"><Button variant="outline" size="sm" className="rounded-xl border-pink-200">View Verification Queue</Button></Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-pink-50 shadow-sm">
            <CardHeader>
              <CardTitle>GRS Assistance</CardTitle>
              <CardDescription>Support center & guidelines.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs text-muted-foreground leading-relaxed">
              <p>
                If you have issues verifying your doctor credentials, registering NGO registration certificates, or setting up Razorpay donations, please contact the GRS Support Desk.
              </p>
              <p className="font-bold text-slate-800">
                Support email: support@grsawareness.org
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Webinars Sub-dashboard */}
        <TabsContent value="webinars" className="space-y-6">
          <Card className="rounded-3xl border border-pink-50 shadow-sm bg-white/50 backdrop-blur-xs">
            <CardHeader className="border-b border-pink-50 pb-5">
              <CardTitle>My Registered Webinars</CardTitle>
              <CardDescription>Track upcoming live timers, join meetings, and access completed records.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {registrations.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">You have no webinar registrations. Go to <Link href="/webinars" className="text-primary font-semibold hover:underline">Webinars</Link> to browse.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {registrations.map(r => {
                    const webinar = r.webinar;
                    const start = new Date(webinar.startTime);
                    const end = new Date(webinar.endTime);
                    const isLive = now >= start && now <= end && webinar.status === "PUBLISHED";
                    const isPast = now > end || webinar.status === "COMPLETED";
                    const isUpcoming = now < start && webinar.status === "PUBLISHED";

                    return (
                      <Card key={r.id} className="group flex flex-col bg-white border border-pink-50 hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden relative">
                        {/* Banner Section */}
                        <div className="relative h-32 w-full bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 flex items-center justify-center overflow-hidden">
                          {webinar.bannerImage ? (
                            <img src={webinar.bannerImage} alt={webinar.title} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="text-center text-primary/30 flex flex-col items-center">
                              <Award className="h-10 w-10 stroke-[1.2] mb-1" />
                              <span className="text-[8px] uppercase font-bold tracking-widest text-primary/50">Certified Webinar</span>
                            </div>
                          )}

                          {/* Status Badge */}
                          <div className="absolute top-3 left-3">
                            <span className="bg-white/80 backdrop-blur-md border border-pink-100/50 text-[9px] font-black text-primary px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                              {webinar.webinarMode}
                            </span>
                          </div>

                          {/* Countdown or Status Indicator */}
                          <div className="absolute bottom-3 right-3">
                            {isUpcoming && (
                              <WebinarCountdown startTime={webinar.startTime} />
                            )}
                            {isLive && (
                              <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full" /> Live Now
                              </span>
                            )}
                            {isPast && (
                              <span className="bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                Completed
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{webinar.category}</span>
                            <h4 className="font-heading font-black text-slate-800 text-base line-clamp-1 group-hover:text-primary transition-colors">{webinar.title}</h4>
                            <p className="text-xs text-slate-500 font-semibold">Speaker: {webinar.speakerName}</p>

                            <div className="text-[11px] text-slate-500 space-y-1.5 pt-2 border-t border-pink-50/50">
                              <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary shrink-0" /> {start.toLocaleDateString()}</div>
                              <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary shrink-0" /> {start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary shrink-0" /> {webinar.venue || "Online"}</div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-3 pt-3 border-t border-slate-100">
                            <div className="flex justify-between items-center text-[10px] font-bold">
                              <span className="text-slate-400">Registration Status</span>
                              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Registered</span>
                            </div>

                            {isUpcoming && (
                              <Button disabled className="w-full bg-slate-100 border border-slate-200 text-slate-400 font-bold rounded-xl text-xs py-2 h-auto cursor-not-allowed">
                                Registered
                              </Button>
                            )}

                            {isLive && (
                              <Link href={`/webinars/${webinar.id}/join`} className="block w-full">
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs py-2 h-auto shadow-md">
                                  Join Live Webinar
                                </Button>
                              </Link>
                            )}

                            {isPast && (
                              <div className="space-y-3">
                                <Button disabled className="w-full bg-slate-100 border border-slate-200 text-slate-400 font-bold rounded-xl text-xs py-2 h-auto cursor-not-allowed">
                                  Completed
                                </Button>

                                {/* Resources & Feedback inside past section */}
                                <div className="space-y-2 pt-2 border-t border-dashed border-slate-100">
                                  <div className="flex gap-2">
                                    {webinar.recordingUrl ? (
                                      <Link href={webinar.recordingUrl} target="_blank" className="flex-1">
                                        <span className="inline-flex w-full items-center justify-center gap-1.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors">
                                          <Video className="h-3.5 w-3.5" /> Recording
                                        </span>
                                      </Link>
                                    ) : (
                                      <span className="flex-1 text-center text-[9px] text-slate-400 italic bg-slate-50 py-1.5 rounded border border-slate-100">No video</span>
                                    )}

                                    {webinar.materialsUrl ? (
                                      <Link href={webinar.materialsUrl} target="_blank" className="flex-1">
                                        <span className="inline-flex w-full items-center justify-center gap-1.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors">
                                          <Download className="h-3.5 w-3.5" /> Materials
                                        </span>
                                      </Link>
                                    ) : (
                                      <span className="flex-1 text-center text-[9px] text-slate-400 italic bg-slate-50 py-1.5 rounded border border-slate-100">No slides</span>
                                    )}
                                  </div>

                                  <WebinarFeedbackForm
                                    webinarId={r.webinarId}
                                    existingFeedback={r.feedback}
                                    existingRating={r.rating}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Certificates Center */}
        <TabsContent value="certificates">
          <Card className="rounded-3xl border border-pink-50 shadow-sm">
            <CardHeader>
              <CardTitle>My Certificates</CardTitle>
              <CardDescription>View, download, or verify your verifiably signed attendance credentials.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {certificates.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <Award className="h-10 w-10 text-pink-200 mx-auto stroke-[1.5]" />
                  <p className="text-xs text-slate-500">You haven't earned any certificates yet.</p>
                  <p className="text-[11px] text-muted-foreground max-w-xs mx-auto">Attend a certified live webinar for at least 80% duration to unlock your cryptographic certificate here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certificates.map(cert => (
                    <div key={cert.id} className="border border-pink-100 rounded-2xl p-5 bg-white/70 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between space-y-4">
                      
                      {/* Small graphics decoration */}
                      <div className="absolute top-4 right-4 opacity-5">
                        <Award className="h-16 w-16 text-rose-500" />
                      </div>

                      <div>
                        <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[8px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                          QR Verified
                        </span>
                        <h4 className="font-bold text-slate-800 text-sm mt-2 line-clamp-1">{cert.eventName}</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Speaker: {cert.speakerName || "GRS Expert"}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">ID: {cert.certificateIdString}</p>
                      </div>

                      <div className="flex gap-2 border-t border-slate-100 pt-3">
                        <Link href={`/api/certificates/${cert.id}/download`}>
                          <Button size="sm" className="bg-primary hover:bg-primary/95 text-white rounded-xl text-[10px] uppercase font-bold py-1.5 h-auto px-4 shadow-sm flex items-center gap-1">
                            <Download className="h-3 w-3" /> Download PDF
                          </Button>
                        </Link>
                        <Link href={`/verify/${cert.certificateIdString}`} target="_blank">
                          <Button size="sm" variant="outline" className="border-pink-200 text-slate-700 hover:bg-pink-50 rounded-xl text-[10px] uppercase font-semibold py-1.5 h-auto px-3 flex items-center gap-1">
                            <ExternalLink className="h-3 w-3" /> Verify QR
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Attendance Logs */}
        <TabsContent value="attendance">
          <Card className="rounded-3xl border border-pink-50 shadow-sm">
            <CardHeader>
              <CardTitle>Attendance History & Credit Logs</CardTitle>
              <CardDescription>Review your join time, duration percentages, and verification states.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 overflow-x-auto">
              {attendanceLogs.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">You have no attendance logs captured yet.</p>
              ) : (
                <table className="w-full text-xs text-left text-slate-500 border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] uppercase text-slate-400 font-bold">
                      <th className="py-2.5">Webinar Name</th>
                      <th className="py-2.5">Join Time</th>
                      <th className="py-2.5">Leave Time</th>
                      <th className="py-2.5 text-center">Duration</th>
                      <th className="py-2.5 text-center">Percentage</th>
                      <th className="py-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {attendanceLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50/50">
                        <td className="py-3 font-bold text-slate-800">{log.webinar.title}</td>
                        <td className="py-3">{log.joinTime ? new Date(log.joinTime).toLocaleString() : "-"}</td>
                        <td className="py-3">{log.leaveTime ? new Date(log.leaveTime).toLocaleString() : "Active Session"}</td>
                        <td className="py-3 text-center">{log.durationMinutes.toFixed(1)} mins</td>
                        <td className="py-3 text-center font-mono font-bold text-slate-700">{log.attendancePercentage.toFixed(0)}%</td>
                        <td className="py-3 text-right">
                          <span className={`inline-block px-2.5 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider ${
                            log.status === "PRESENT" || log.status === "Completed"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                              : "bg-red-50 text-red-500 border border-red-100"
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 5: Alerts / Notifications */}
        <TabsContent value="notifications">
          <Card className="rounded-3xl border border-pink-50 shadow-sm">
            <CardHeader>
              <CardTitle>System Notifications & Alerts</CardTitle>
              <CardDescription>Track webinar times, certificates ready, and registration approvals.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {notifications.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">Your inbox is empty.</p>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notif, i) => (
                    <div key={i} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 flex justify-between items-start gap-4">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`inline-block h-2 w-2 rounded-full ${
                            notif.type === "SUCCESS" ? "bg-blue-500" : notif.type === "WARNING" ? "bg-amber-500" : "bg-primary"
                          }`} />
                          <h4 className="font-bold text-slate-800">{notif.title}</h4>
                        </div>
                        <p className="text-slate-500 pl-4">{notif.message}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{new Date(notif.date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
