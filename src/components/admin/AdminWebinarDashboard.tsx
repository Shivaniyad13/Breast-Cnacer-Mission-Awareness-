"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createWebinarAction, editWebinarAction, deleteWebinarAction,
  updateWebinarStatusAction, uploadRecordingAction, uploadMaterialsAction,
  sendReminderAction
} from "@/app/actions/webinars";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar, Clock, MapPin, Users, Award, ShieldCheck, Video,
  Trash2, Edit, Plus, FileText, CheckCircle, HelpCircle, Download, ExternalLink, Loader2
} from "lucide-react";

interface AdminWebinarDashboardProps {
  webinars: any[];
}

export default function AdminWebinarDashboard({ webinars }: AdminWebinarDashboardProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [showAttendeesId, setShowAttendeesId] = useState<string | null>(null);

  // Create Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [speakerName, setSpeakerName] = useState("");
  const [speakerImage, setSpeakerImage] = useState("");
  const [speakerBio, setSpeakerBio] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [webinarMode, setWebinarMode] = useState("Online");
  const [meetingLink, setMeetingLink] = useState("");
  const [maxSeats, setMaxSeats] = useState("100");
  const [category, setCategory] = useState("General");
  const [status, setStatus] = useState("DRAFT");

  // Modals / Selected Items State
  const [selectedWebinar, setSelectedWebinar] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  const [inputUrl, setInputUrl] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !speakerName || !date || !startTime || !endTime) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      title, description, fullContent, bannerImage, speakerName,
      speakerImage, speakerBio, date, startTime: `${date}T${startTime}`,
      endTime: `${date}T${endTime}`, venue, city, state, country,
      webinarMode, meetingLink, maxSeats, category, status
    };

    setIsPending(true);
    try {
      const res = await createWebinarAction(payload);
      if (res.success) {
        resetForm();
        setActiveTab("list");
        router.refresh();
      }
    } catch (e: any) {
      alert(e.message || "Failed to create webinar.");
    } finally {
      setIsPending(false);
    }
  };

  const handleEditSetup = (webinar: any) => {
    setSelectedWebinar(webinar);
    setIsEditMode(true);
    setTitle(webinar.title);
    setDescription(webinar.description);
    setFullContent(webinar.fullContent);
    setBannerImage(webinar.bannerImage || "");
    setSpeakerName(webinar.speakerName);
    setSpeakerImage(webinar.speakerImage || "");
    setSpeakerBio(webinar.speakerBio || "");

    // Format Date string: yyyy-MM-dd
    const dateObj = new Date(webinar.date);
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");
    setDate(`${yyyy}-${mm}-${dd}`);

    // Format times: HH:mm
    const formatTime = (dStr: string) => {
      const d = new Date(dStr);
      return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    };
    setStartTime(formatTime(webinar.startTime));
    setEndTime(formatTime(webinar.endTime));

    setVenue(webinar.venue || "");
    setCity(webinar.city || "");
    setState(webinar.state || "");
    setCountry(webinar.country || "");
    setWebinarMode(webinar.webinarMode);
    setMeetingLink(webinar.meetingLink);
    setMaxSeats(webinar.maxSeats.toString());
    setCategory(webinar.category);
    setStatus(webinar.status);

    setActiveTab("create"); // reuse the tab for edit form
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWebinar) return;

    const payload = {
      title, description, fullContent, bannerImage, speakerName,
      speakerImage, speakerBio, date, startTime: `${date}T${startTime}`,
      endTime: `${date}T${endTime}`, venue, city, state, country,
      webinarMode, meetingLink, maxSeats, category, status
    };

    setIsPending(true);
    try {
      const res = await editWebinarAction(selectedWebinar.id, payload);
      if (res.success) {
        resetForm();
        setIsEditMode(false);
        setSelectedWebinar(null);
        setActiveTab("list");
        router.refresh();
      }
    } catch (e: any) {
      alert(e.message || "Failed to update webinar.");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this webinar? This will delete registrations and attendance history!")) return;
    try {
      await deleteWebinarAction(id);
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Could not delete.");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateWebinarStatusAction(id, newStatus);
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Could not update status.");
    }
  };

  const handleRecordingUpload = async () => {
    if (!selectedWebinar) return;
    try {
      await uploadRecordingAction(selectedWebinar.id, inputUrl);
      setShowRecordingModal(false);
      setInputUrl("");
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Failed to save.");
    }
  };

  const handleMaterialsUpload = async () => {
    if (!selectedWebinar) return;
    try {
      await uploadMaterialsAction(selectedWebinar.id, inputUrl);
      setShowMaterialsModal(false);
      setInputUrl("");
      router.refresh();
    } catch (e: any) {
      alert(e.message || "Failed to save.");
    }
  };

  const handleSendReminder = async (webinarId: string) => {
    setIsPending(true);
    try {
      const res = await sendReminderAction(webinarId);
      if (res.success) {
        alert(res.message);
      }
    } catch (e: any) {
      alert(e.message || "Failed to send reminder.");
    } finally {
      setIsPending(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFullContent("");
    setBannerImage("");
    setSpeakerName("");
    setSpeakerImage("");
    setSpeakerBio("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setVenue("");
    setCity("");
    setState("");
    setCountry("");
    setWebinarMode("Online");
    setMeetingLink("");
    setMaxSeats("100");
    setCategory("General");
    setStatus("DRAFT");
    setIsEditMode(false);
    setSelectedWebinar(null);
  };

  // CSV Export registrations for a specific webinar
  const handleExportCSV = (webinar: any) => {
    if (!webinar.registrations || webinar.registrations.length === 0) {
      alert("No registrations to export.");
      return;
    }

    const headers = ["Attendee Name", "Attendee Email", "Registration Date", "Role"];
    const rows = webinar.registrations.map((r: any) => [
      `"${r.user.name || 'Participant'}"`,
      `"${r.user.email}"`,
      `"${new Date(r.registeredAt).toLocaleString()}"`,
      `"${r.user.role}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(","), ...rows.map((e: any) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${webinar.title.replace(/\s+/g, "_")}_Attendees.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">

      {/* Tab Navigation header */}
      <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); if (val === "create" && !isEditMode) resetForm(); }} className="space-y-6">
        <TabsList className="bg-pink-50/50 border border-pink-100/50 p-1 rounded-xl">
          <TabsTrigger value="list" className="font-bold text-xs uppercase py-2">
            Webinars List
          </TabsTrigger>
          <TabsTrigger value="create" className="font-bold text-xs uppercase py-2 flex items-center gap-1">
            {isEditMode ? <Edit className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {isEditMode ? "Edit Webinar" : "Create Webinar"}
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Webinars List */}
        <TabsContent value="list" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {webinars.length === 0 ? (
              <Card className="rounded-3xl border border-pink-100/50 p-12 text-center text-slate-500">
                No webinars created. Click on "Create Webinar" to get started.
              </Card>
            ) : (
              webinars.map((webinar) => {
                const isCompleted = webinar.status === "COMPLETED";
                const totalRegistrations = webinar.registrations?.length || 0;
                const totalAttendance = webinar.attendance?.filter((a: any) => a.status === "PRESENT").length || 0;

                return (
                  <Card key={webinar.id} className="rounded-3xl border border-pink-50 shadow-sm overflow-hidden bg-white hover:border-pink-200/50 transition-colors">
                    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">

                      {/* Left: Metadata */}
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex gap-2 items-center">
                          <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded tracking-wider border ${webinar.status === "PUBLISHED"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : webinar.status === "COMPLETED"
                                ? "bg-slate-100 text-slate-500 border-slate-200"
                                : "bg-amber-50 text-amber-500 border-amber-100"
                            }`}>
                            {webinar.status}
                          </span>
                          <span className="bg-pink-50 border border-pink-100 text-primary text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {webinar.webinarMode}
                          </span>
                        </div>
                        <h3 className="font-heading text-lg font-black text-slate-800">{webinar.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{webinar.description}</p>

                        <div className="grid grid-cols-2 gap-4 pt-2 text-[11px] text-slate-500 font-semibold">
                          <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary shrink-0" /> {new Date(webinar.date).toLocaleDateString("en-US")}</div>
                          <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary shrink-0" /> {new Date(webinar.startTime).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}</div>
                          <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary shrink-0" /> {webinar.city || "Online"}</div>
                          <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-primary shrink-0" /> {totalRegistrations} Registered</div>
                        </div>
                      </div>

                      {/* Middle: Stats & Metrics */}
                      <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-xs space-y-3">
                        <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[9px]">Analytics Summary</h4>
                        <div className="space-y-1.5 font-medium text-slate-600">
                          <div className="flex justify-between">
                            <span>Max Seats:</span>
                            <span className="font-bold text-slate-800">{webinar.maxSeats}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>RSVPs:</span>
                            <span className="font-bold text-slate-800">{totalRegistrations} ({((totalRegistrations / webinar.maxSeats) * 100).toFixed(0)}%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Certified:</span>
                            <span className="font-bold text-emerald-600">{totalAttendance} attendees</span>
                          </div>
                        </div>

                        {/* CSV trigger */}
                        <Button
                          onClick={() => handleExportCSV(webinar)}
                          disabled={totalRegistrations === 0}
                          size="sm"
                          variant="outline"
                          className="w-full border-pink-200 hover:bg-pink-50 rounded-xl text-[10px] uppercase font-bold flex items-center justify-center gap-1 h-8"
                        >
                          <Download className="h-3 w-3" /> Export RSVPs CSV
                        </Button>

                        <Button
                          onClick={() => setShowAttendeesId(showAttendeesId === webinar.id ? null : webinar.id)}
                          disabled={totalRegistrations === 0}
                          size="sm"
                          variant="outline"
                          className="w-full border-pink-200 hover:bg-pink-50 rounded-xl text-[10px] uppercase font-bold flex items-center justify-center gap-1 h-8 mt-1"
                        >
                          <Users className="h-3.5 w-3.5" /> {showAttendeesId === webinar.id ? "Hide Attendees" : "View Attendees"}
                        </Button>
                      </div>

                      {/* Right: Actions Buttons Grid */}
                      <div className="flex flex-col gap-2 justify-end h-full">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditSetup(webinar)}
                            variant="outline"
                            className="flex-1 border-pink-200 hover:bg-pink-50 rounded-xl text-[10px] uppercase font-bold py-2 h-auto"
                          >
                            <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(webinar.id)}
                            variant="outline"
                            className="border-red-200 hover:bg-red-50 text-red-500 rounded-xl text-[10px] uppercase font-bold py-2 h-auto"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>

                        {/* Status updates triggers */}
                        {webinar.status === "DRAFT" && (
                          <Button
                            onClick={() => handleStatusChange(webinar.id, "PUBLISHED")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] uppercase font-bold py-2 h-auto shadow-sm"
                          >
                            Publish Webinar
                          </Button>
                        )}

                        {webinar.status === "PUBLISHED" && (
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleStatusChange(webinar.id, "COMPLETED")}
                                className="flex-1 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-[10px] uppercase font-bold py-2 h-auto"
                              >
                                Complete
                              </Button>
                              <Button
                                onClick={() => handleStatusChange(webinar.id, "CANCELLED")}
                                variant="outline"
                                className="border-slate-300 rounded-xl text-[10px] uppercase font-bold py-2 h-auto"
                              >
                                Cancel
                              </Button>
                            </div>
                            <Button
                              onClick={() => handleSendReminder(webinar.id)}
                              disabled={totalRegistrations === 0}
                              className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-[10px] uppercase font-bold py-2 h-auto"
                            >
                              Send Reminder
                            </Button>
                          </div>
                        )}

                        {/* Media Upload triggers */}
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <Button
                            onClick={() => { setSelectedWebinar(webinar); setInputUrl(webinar.recordingUrl || ""); setShowRecordingModal(true); }}
                            variant="outline"
                            className="border-pink-200 rounded-xl text-[8px] uppercase font-extrabold p-1.5 h-auto text-slate-700 hover:bg-pink-50"
                          >
                            Upload Video
                          </Button>
                          <Button
                            onClick={() => { setSelectedWebinar(webinar); setInputUrl(webinar.materialsUrl || ""); setShowMaterialsModal(true); }}
                            variant="outline"
                            className="border-pink-200 rounded-xl text-[8px] uppercase font-extrabold p-1.5 h-auto text-slate-700 hover:bg-pink-50"
                          >
                            Upload Resource
                          </Button>
                        </div>

                      </div>

                    </div>

                    {/* Collapsible Attendees List */}
                    {showAttendeesId === webinar.id && webinar.registrations && (
                      <div className="px-6 pb-6 border-t border-slate-100 pt-5 animate-in slide-in-from-top-4 duration-200 text-slate-700 bg-slate-50/20">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Registered Attendees ({totalRegistrations})</h4>
                        <div className="overflow-x-auto rounded-xl border border-slate-100 max-h-60 overflow-y-auto">
                          <table className="w-full text-left border-collapse text-[11px] text-slate-600 font-medium">
                            <thead>
                              <tr className="bg-slate-50 text-[10px] text-slate-400 uppercase font-black border-b border-slate-100">
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Gender</th>
                                <th className="p-3">Age</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Occupation</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 bg-white">
                              {webinar.registrations.map((reg: any) => (
                                <tr key={reg.id} className="hover:bg-slate-50/50">
                                  <td className="p-3 font-bold text-slate-800">{reg.name || reg.user.name || "Participant"}</td>
                                  <td className="p-3 font-mono">{reg.email || reg.user.email}</td>
                                  <td className="p-3 font-mono">{reg.phone || "N/A"}</td>
                                  <td className="p-3">{reg.gender || "N/A"}</td>
                                  <td className="p-3 font-mono">{reg.age > 0 ? reg.age : "N/A"}</td>
                                  <td className="p-3">{reg.city ? `${reg.city}, ${reg.state}` : "N/A"}</td>
                                  <td className="p-3">{reg.occupation || "N/A"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        {/* Tab 2: Create / Edit Form Wizard */}
        <TabsContent value="create">
          <Card className="rounded-3xl border border-pink-50 shadow-sm max-w-4xl mx-auto">
            <CardHeader className="border-b border-pink-50 pb-5">
              <CardTitle>{isEditMode ? "Edit Webinar Details" : "Create New Webinar"}</CardTitle>
              <CardDescription>Enter details, speaker parameters, dates, and locations.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={isEditMode ? handleUpdate : handleCreate} className="space-y-6 text-sm text-slate-700">

                {/* Section: Main Meta */}
                <div className="space-y-4">
                  <h4 className="font-bold text-primary uppercase text-xs tracking-wider border-b border-pink-50 pb-1.5">General Parameters</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Webinar Title *</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Early Staging of Breast Cancer"
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Category *</label>
                      <input
                        type="text"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Clinical, Prevention, Volunteerism"
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Short Description *</label>
                    <textarea
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief 1-2 sentence overview shown in browse cards..."
                      rows={2}
                      className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Full Content / Full Description</label>
                    <textarea
                      value={fullContent}
                      onChange={(e) => setFullContent(e.target.value)}
                      placeholder="Full outline, topics, and complete details of the program..."
                      rows={4}
                      className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Banner Image URL</label>
                      <input
                        type="text"
                        value={bannerImage}
                        onChange={(e) => setBannerImage(e.target.value)}
                        placeholder="https://example.com/banner.jpg"
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Max Seats Available *</label>
                      <input
                        type="number"
                        required
                        value={maxSeats}
                        onChange={(e) => setMaxSeats(e.target.value)}
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Speaker */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-primary uppercase text-xs tracking-wider border-b border-pink-50 pb-1.5">Speaker Parameters</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Speaker Name *</label>
                      <input
                        type="text"
                        required
                        value={speakerName}
                        onChange={(e) => setSpeakerName(e.target.value)}
                        placeholder="Dr. Ananya Sen"
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Speaker Photo URL</label>
                      <input
                        type="text"
                        value={speakerImage}
                        onChange={(e) => setSpeakerImage(e.target.value)}
                        placeholder="https://example.com/speaker.jpg"
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Speaker Bio</label>
                    <textarea
                      value={speakerBio}
                      onChange={(e) => setSpeakerBio(e.target.value)}
                      placeholder="Degrees, affiliations, and professional backgrounds..."
                      rows={2}
                      className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                    />
                  </div>
                </div>

                {/* Section: Dates & Timing */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-primary uppercase text-xs tracking-wider border-b border-pink-50 pb-1.5">Timing & Schedule</h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Webinar Date *</label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Start Time *</label>
                      <input
                        type="time"
                        required
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">End Time *</label>
                      <input
                        type="time"
                        required
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Mode & Location details */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-primary uppercase text-xs tracking-wider border-b border-pink-50 pb-1.5">Venue & Mode Details</h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Webinar Mode *</label>
                      <select
                        value={webinarMode}
                        onChange={(e) => setWebinarMode(e.target.value)}
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800 text-sm"
                      >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-600">Meeting Room Link * (Zoom / Teams / Meet)</label>
                      <input
                        type="text"
                        required
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        placeholder="https://zoom.us/j/meeting_id"
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Venue (Address)</label>
                      <input
                        type="text"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        placeholder="e.g. Zoom Server / Khushi Hall"
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="New Delhi"
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">State</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Delhi"
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Country</label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="India"
                        className="w-full bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Status selection (Draft/Published/Completed) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Status *</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-pink-50/10 border border-border/80 rounded-xl px-3.5 py-2 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-slate-800 text-sm"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="border-pink-200 rounded-xl px-6"
                  >
                    Reset Form
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-primary hover:bg-primary/95 text-white font-bold rounded-xl px-8 shadow-md"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-1.5">
                        <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                      </span>
                    ) : (
                      isEditMode ? "Update Webinar" : "Create Webinar"
                    )}
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upload Recording URL Modal */}
      {showRecordingModal && selectedWebinar && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-pink-100 p-6 max-w-md w-full space-y-4 text-slate-800 shadow-2xl">
            <h3 className="font-heading text-lg font-black text-slate-800">Upload Webinar Recording</h3>
            <p className="text-xs text-muted-foreground">Provide the public recording address (e.g. YouTube/Vimeo link) for attendees.</p>

            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full text-xs bg-slate-50 border border-border/80 rounded-xl px-3.5 py-2.5 outline-none focus:border-primary/50 text-slate-800"
            />

            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => { setShowRecordingModal(false); setInputUrl(""); }} className="rounded-xl">Cancel</Button>
              <Button size="sm" onClick={handleRecordingUpload} className="bg-primary hover:bg-primary/95 text-white rounded-xl font-bold px-4">Save Recording</Button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Materials URL Modal */}
      {showMaterialsModal && selectedWebinar && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-pink-100 p-6 max-w-md w-full space-y-4 text-slate-800 shadow-2xl">
            <h3 className="font-heading text-lg font-black text-slate-800">Upload Webinar Materials</h3>
            <p className="text-xs text-muted-foreground">Provide resource download folder, slides, or PDF worksheet document link.</p>

            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://drive.google.com/drive/..."
              className="w-full text-xs bg-slate-50 border border-border/80 rounded-xl px-3.5 py-2.5 outline-none focus:border-primary/50 text-slate-800"
            />

            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => { setShowMaterialsModal(false); setInputUrl(""); }} className="rounded-xl">Cancel</Button>
              <Button size="sm" onClick={handleMaterialsUpload} className="bg-primary hover:bg-primary/95 text-white rounded-xl font-bold px-4">Save Materials</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
