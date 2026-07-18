import { Metadata } from "next";
import MembershipClient from "./MembershipClient";

export const metadata: Metadata = {
  title: "Become a GRS Community Member | GRS Breast Cancer Mission",
  description: "Join the GRS Breast Cancer Mission community. Choose your membership category, access campaigns benefits, join webinar streams, and participate in health advocacy drives.",
};

export default function MembershipPage() {
  return <MembershipClient />;
}
