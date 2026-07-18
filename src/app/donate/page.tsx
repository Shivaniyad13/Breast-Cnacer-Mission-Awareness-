"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Ribbon, 
  IndianRupee, 
  ShieldCheck, 
  CheckCircle, 
  Heart,
  Info,
  Users,
  TrendingUp,
  HeartHandshake,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function DonatePage() {
  // Donation states
  const [goal] = useState(1500000);
  const [collected, setCollected] = useState(725000);
  const [selectedDonation, setSelectedDonation] = useState<number | null>(2500);
  const [customDonation, setCustomDonation] = useState("");
  const [showDonateSuccess, setShowDonateSuccess] = useState(false);
  const [donating, setDonating] = useState(false);
  const [donorsCount, setDonorsCount] = useState(318);

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedDonation || parseFloat(customDonation);
    if (!amount || amount <= 0) return;

    setDonating(true);
    setTimeout(() => {
      setCollected((prev) => prev + amount);
      setDonorsCount((prev) => prev + 1);
      setDonating(false);
      setShowDonateSuccess(true);
      setTimeout(() => setShowDonateSuccess(false), 4500);
    }, 1500);
  };

  // Active verified patient cases in need of immediate funding
  const activePatients = [
    {
      name: "Savitri Devi",
      age: 42,
      location: "Noida, UP",
      diagnosis: "Stage III Invasive Ductal Carcinoma",
      required: 180000,
      raised: 135000,
      hospital: "Khushi Rehab & Oncology Centre",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Renu Bala",
      age: 38,
      location: "Ghaziabad, UP",
      diagnosis: "Stage II HER2-Positive Breast Cancer",
      required: 250000,
      raised: 190000,
      hospital: "Khushi Rehab & Oncology Centre",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Kiran Sharma",
      age: 49,
      location: "Faridabad, HR",
      diagnosis: "Early-stage Lobular Carcinoma",
      required: 120000,
      raised: 95000,
      hospital: "Khushi Rehab & Oncology Centre",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
    }
  ];

  // Fund utilization breakdown
  const utilization = [
    { percentage: "50%", category: "Direct Chemotherapy & Medicines", details: "Acquiring clinical oncology drugs directly from verified pharmaceutical manufacturers to cut treatment costs by up to 40%." },
    { percentage: "30%", category: "Oncological Surgery & Biopsy Support", details: "Funding mastectomies, lumpectomies, sentinel node biopsies, and post-surgical reconstructive support for rural mothers." },
    { percentage: "20%", category: "Post-Operative Rehabilitation", details: "Providing custom external silicone prosthetics, professional lymphatic drainage therapy, and mental health counseling." }
  ];

  // Past success stories showing real impact
  const successStories = [
    {
      name: "Meera Krishnan",
      role: "Mastectomy Survivor & GRS Advocate",
      story: "When I was diagnosed with Stage II breast cancer, chemotherapy costs seemed impossible. Through this campaign, my surgical expenses were directly cleared to the hospital. Today, I am cancer-free and volunteer my time to guide other rural patients.",
      badge: "Stage II Survivor",
      impact: "Mastectomy & 6 Chemo Cycles Funded"
    },
    {
      name: "Kusum Lata",
      role: "Stage III Survivor & Mother of Two",
      story: "I had lost hope of seeing my children grow up. GRS donors funded my targeted radiation therapy and post-op care. Saving a mother is saving the whole family, and the donors did exactly that for me. I am forever grateful.",
      badge: "Stage III Survivor",
      impact: "Radiation Therapy & Post-Op Care Funded"
    }
  ];

  return (
    <div className="flex-1 w-full bg-gradient-to-b from-rose-50/20 via-white to-slate-50/50 py-12 selection:bg-pink-100 selection:text-pink-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Heart className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600 animate-pulse" />
            Verified Medical Aid Campaign
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Support Underprivileged Breast Cancer Patients
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every donation directly clears chemotherapy, surgery, and clinical rehabilitation expenses for underprivileged women at our associated oncology center.
          </p>
          
          {/* Action Button that scrolls down with green color & hover effect */}
          <div className="pt-2">
            <a href="#donate-now">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-600/25 hover:scale-105 active:scale-95 cursor-pointer">
                Donate Now
              </Button>
            </a>
          </div>
        </div>

        {/* Emotional Quote Panel */}
        <div className="bg-rose-50/50 border border-rose-100/70 rounded-3xl p-6 md:p-8 text-center max-w-3xl mx-auto shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-5 pointer-events-none">
            <Ribbon className="h-48 w-48 text-pink-500" />
          </div>
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-slate-800 leading-relaxed font-semibold font-serif">
            &ldquo;Contribute to save the heartbeat of a family—the mother. Save her life, her dignity, and her future. Behind every breast cancer patient is a family waiting for their mother to return home whole.&rdquo;
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-black tracking-widest text-pink-600 uppercase">
            <span className="h-px w-6 bg-pink-300"></span>
            Every Contribution Preserves a Family
            <span className="h-px w-6 bg-pink-300"></span>
          </div>
        </div>

        {/* Main Donation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">

          {/* LEFT: Donation form card */}
          <Card id="donate-now" className="lg:col-span-7 border-rose-100/60 bg-white shadow-lg p-6 sm:p-8 space-y-6 rounded-3xl">
            
            {/* Target goals progress bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-end text-sm">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Campaign Target</p>
                  <p className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">
                    ₹{collected.toLocaleString()} <span className="text-xs font-semibold text-slate-500">raised of ₹15,00,000 goal</span>
                  </p>
                </div>
                <span className="font-bold text-emerald-600 text-base">
                  {((collected / goal) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500" 
                  style={{ width: `${(collected / goal) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-semibold italic">
                <span>* Direct hospital payouts enabled.</span>
                <span>{donorsCount} verified donors</span>
              </div>
            </div>

            {/* Donation calculator input forms */}
            {showDonateSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold text-center flex flex-col items-center justify-center gap-2"
              >
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-base text-emerald-900 font-bold">Donation Processed Successfully!</p>
                  <p className="text-xs text-emerald-700 font-normal mt-1 leading-relaxed">
                    Thank you for your life-saving contribution. A tax-exempt 80G receipt and certificate copy has been emailed to your registration address.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleDonateSubmit} className="space-y-5">
                <div className="space-y-2.5">
                  <Label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                    Select Donation Amount (₹)
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1000, 2500, 5000, 10000].map((amt) => (
                      <Button
                        key={amt}
                        type="button"
                        variant={selectedDonation === amt ? "default" : "outline"}
                        onClick={() => {
                          setSelectedDonation(amt);
                          setCustomDonation("");
                        }}
                        className={`text-xs sm:text-sm font-bold rounded-xl py-5 h-auto transition-all cursor-pointer ${
                          selectedDonation === amt 
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/10 border-emerald-600" 
                            : "hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 border-slate-200"
                        }`}
                      >
                        ₹{amt.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="customDonation" className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                    Or Enter Custom Amount (₹)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">₹</span>
                    <Input
                      id="customDonation"
                      placeholder="Enter other amount"
                      type="number"
                      value={customDonation}
                      onChange={(e) => {
                        setCustomDonation(e.target.value);
                        setSelectedDonation(null);
                      }}
                      className="bg-slate-50 pl-8 p-3 h-12 rounded-xl border border-slate-200 outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-semibold"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={donating} 
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 text-base border-0 rounded-2xl flex items-center justify-center gap-2 relative overflow-hidden transition-all duration-300 shadow-md shadow-emerald-600/10 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  {donating ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      Connecting to Secure Gateway...
                    </span>
                  ) : (
                    <>
                      <IndianRupee className="h-5 w-5" />
                      Proceed to Donation Gateway
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Security trust badges */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap justify-around items-center gap-4 text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4.5 w-4.5 text-emerald-600" /> Direct Hospital Bank Payout</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4.5 w-4.5 text-emerald-600" /> Tax Exempt 80G Compliant</span>
            </div>

          </Card>

          {/* RIGHT: QR Code SCAN & PAY card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <Card className="border border-rose-100/50 shadow-lg rounded-3xl overflow-hidden w-full max-w-xs mx-auto bg-white">
              {/* SBI Header */}
              <div className="bg-white px-6 pt-6 pb-3 flex flex-col items-center gap-2 border-b border-slate-100">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/1200px-SBI-logo.svg.png"
                  alt="State Bank of India"
                  className="h-10 w-auto object-contain"
                />
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center leading-relaxed">
                  Khushi Centre for Rehabilitation
                </p>
              </div>

              {/* SCAN & PAY label */}
              <div className="bg-white px-6 py-2.5 text-center">
                <p className="text-lg font-extrabold text-slate-800 tracking-widest uppercase">
                  SCAN &amp; PAY
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white px-8 pb-4 flex justify-center">
                <div className="border-2 border-slate-100 rounded-2xl p-2 bg-white shadow-inner">
                  <img
                    src="/khushi-upi-qr.png"
                    alt="Khushi Centre UPI QR Code - Scan to Pay"
                    className="w-48 h-48 object-contain"
                  />
                </div>
              </div>

              {/* UPI ID */}
              <div className="bg-slate-50 px-6 py-4 text-center border-t border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">UPI ID</p>
                <p className="text-sm font-bold text-slate-700 mt-0.5 font-mono select-all">49122452@sbi</p>
              </div>
            </Card>

            {/* Helper text below QR */}
            <p className="text-xs text-slate-500 text-center mt-5 max-w-xs leading-relaxed">
              Scan with any UPI application (PhonePe, GPay, Paytm, BHIM) to make a direct transfer to Khushi Centre&apos;s SBI account.
            </p>
          </div>

        </div>

        {/* SECTION: Active Patient Case Files */}
        <div className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-[10px] font-bold uppercase tracking-wider">
              <Users className="h-3 w-3" />
              Verified Patient Case Files
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-800">
              Active Treatment Fund Requests
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              These are registered and verified patients currently undergoing treatment at our associate facility who require direct financial clearance for upcoming therapy cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activePatients.map((patient, idx) => (
              <Card key={idx} className="border border-slate-100 hover:border-pink-200 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md flex flex-col rounded-2xl bg-white group">
                <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-800 shadow-xs">
                    {patient.location}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-slate-800 flex justify-between items-center">
                      <span>{patient.name}</span>
                      <span className="text-xs text-slate-500 font-normal">{patient.age} yrs</span>
                    </h3>
                    <p className="text-[11px] font-semibold text-pink-600 uppercase tracking-wider">{patient.diagnosis}</p>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{patient.hospital}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" 
                        style={{ width: `${(patient.raised / patient.required) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>₹{patient.raised.toLocaleString()} raised</span>
                      <span className="text-slate-400">Target ₹{patient.required.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* SECTION: Donation Impact & Transparency */}
        <div id="donation-impact" className="space-y-8 pt-4 border-t border-slate-100">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
              <TrendingUp className="h-3 w-3" />
              How Your Funds Are Spent
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-800">
              Complete Financial Transparency
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              Every rupee donated is directly logged and distributed to lower hospital costs and support patient outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {utilization.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-black text-emerald-600 tracking-tight">{item.percentage}</span>
                  <HeartHandshake className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm tracking-tight">{item.category}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: Success Stories */}
        <div id="success-stories" className="space-y-8 pt-4 border-t border-slate-100">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-pink-700 text-[10px] font-bold uppercase tracking-wider">
              <CheckCircle className="h-3 w-3" />
              Testimonials of Treatment
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-800">
              Stories of Hope & Healing
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              Meet some of the mothers whose treatment costs were covered directly through generous contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, idx) => (
              <Card key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex px-3 py-1 rounded-full bg-pink-100/50 text-pink-700 text-[10px] font-bold uppercase tracking-wider">
                      {story.badge}
                    </span>
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg font-semibold flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> {story.impact}
                    </span>
                  </div>
                  <p className="text-slate-600 italic text-sm sm:text-base leading-relaxed">
                    &ldquo;{story.story}&rdquo;
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{story.name}</h4>
                    <p className="text-xs text-slate-400">{story.role}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Medical disclaimer note & transparency audit info */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/50 flex gap-3 text-xs text-slate-500 max-w-3xl mx-auto leading-relaxed">
          <Info className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-slate-700">Financial Transparency & Security Audit Note:</p>
            <p>
              All contributions raised on this campaign are audited directly by GRS compliance teams. Disbursements are released directly to the registered medical facility bank accounts to ensure complete fraud protection. 80G tax certificate copies are issued within 24 hours of successful bank confirmation.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
