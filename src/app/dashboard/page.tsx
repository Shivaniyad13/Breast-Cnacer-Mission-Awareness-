import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Heart, BookOpen, Award, Users } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {user.name}
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your breast cancer awareness dashboard as a <span className="text-primary font-semibold uppercase">{user.role}</span>
          </p>
        </div>
        <div className="flex gap-2">
          {user.role === "ADMIN" && (
            <Link href="/admin">
              <Button className="bg-primary text-white">Go to Admin Command Center</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dynamic content card based on roles */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>View your records, notifications, and approvals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/40 border border-border/50 text-sm">
              <p className="font-medium text-foreground">Verification Status: Active</p>
              <p className="text-muted-foreground mt-1">
                Your account is verified. You can access all features configured for your role on the network.
              </p>
            </div>
            
            {user.role === "VOLUNTEER" && (
              <div className="space-y-2 text-sm pt-2">
                <p className="font-semibold text-primary flex items-center gap-1.5"><Award className="h-4 w-4" /> Earned Certificates</p>
                <p className="text-muted-foreground">Complete the breast cancer awareness quiz or attend certified webinars to earn downloadable QR-verified certificates.</p>
                <Link href="/learn/quiz" className="block"><Button variant="outline" size="sm">Go to Quiz Engine</Button></Link>
              </div>
            )}

            {user.role === "PATIENT" && (
              <div className="space-y-2 text-sm pt-2">
                <p className="font-semibold text-primary flex items-center gap-1.5"><Heart className="h-4 w-4" /> My Campaigns</p>
                <p className="text-muted-foreground">No active crowdfunding campaigns found. Upload medical bills and request NGO endorsements to start fundraising.</p>
                <Link href="/campaigns/create" className="block"><Button variant="outline" size="sm">Create Campaign</Button></Link>
              </div>
            )}

            {user.role === "DOCTOR" && (
              <div className="space-y-2 text-sm pt-2">
                <p className="font-semibold text-primary flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> Medical Publications</p>
                <p className="text-muted-foreground">Publish oncologist-verified guidelines and physical test schedules to raise public awareness.</p>
                <Link href="/learn/articles" className="block"><Button variant="outline" size="sm">Write Article</Button></Link>
              </div>
            )}

            {user.role === "NGO_REP" && (
              <div className="space-y-2 text-sm pt-2">
                <p className="font-semibold text-primary flex items-center gap-1.5"><Users className="h-4 w-4" /> Endorsement Requests</p>
                <p className="text-muted-foreground">Audit patient registration files and verify bank accounts to endorse fundraising campaigns.</p>
                <Link href="/dashboard" className="block"><Button variant="outline" size="sm">View Verification Queue</Button></Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Support Card */}
        <Card>
          <CardHeader>
            <CardTitle>GRS Assistance</CardTitle>
            <CardDescription>Support center & guidelines.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-muted-foreground leading-relaxed">
            <p>
              If you have issues verifying your doctor credentials, registering NGO registration certificates, or setting up Razorpay donations, please contact the GRS Support Desk.
            </p>
            <p className="font-bold text-foreground">
              Support email: support@grsawareness.org
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
