import { Ribbon, Building2 } from "lucide-react";

export const metadata = {
  title: "Partner Organizations | Breast Cancer Mission",
  description: "Explore NGOs and partner organizations collaborating with the Breast Cancer Awareness Mission to support patients and spread awareness.",
};

export default function PartnerOrganizationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 via-white to-rose-50/30 flex items-center justify-center py-24 px-4">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-rose-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-wider">
          <Ribbon className="h-4 w-4 animate-pulse" />
          NGO &amp; Partners
        </div>

        {/* Icon */}
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Building2 className="h-10 w-10 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-4xl sm:text-5xl font-black text-slate-800 leading-tight">
          Partner <span className="text-primary">Organizations</span>
        </h1>

        {/* Description */}
        <p className="text-slate-500 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
          This section will showcase registered NGOs, charitable trusts, and
          institutional partners who endorse campaigns, organize screening camps,
          and collaborate with us to advance breast cancer care across communities.
        </p>

        {/* Coming Soon pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-muted-foreground text-sm font-medium shadow-sm">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          Content coming soon
        </div>
      </div>
    </div>
  );
}
