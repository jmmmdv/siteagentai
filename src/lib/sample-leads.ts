export type LeadStatus = "New" | "Contacted" | "Qualified" | "Closed";

export type SampleLead = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  urgency: "Low" | "Medium" | "High";
  status: LeadStatus;
  aiSummary: string;
  recommendedAction: string;
  submittedAt: string;
};

export const sampleLeads: SampleLead[] = [
  {
    id: "1",
    customerName: "Sarah Mitchell",
    email: "sarah.mitchell@gmail.com",
    phone: "(512) 555-0142",
    serviceNeeded: "Emergency AC repair",
    urgency: "High",
    status: "New",
    aiSummary:
      "Homeowner reports AC stopped working during a heat wave. Unit is 8 years old, making unusual clicking sounds. Likely compressor or capacitor issue. Customer is available today and prefers afternoon visits.",
    recommendedAction:
      "Call within 15 minutes. Offer same-day diagnostic visit between 2–5 PM. Mention seasonal maintenance plan after repair.",
    submittedAt: "2 hours ago",
  },
  {
    id: "2",
    customerName: "James Rodriguez",
    email: "j.rodriguez@outlook.com",
    phone: "(512) 555-0287",
    serviceNeeded: "Kitchen remodel consultation",
    urgency: "Medium",
    status: "Contacted",
    aiSummary:
      "Looking to remodel a 150 sq ft kitchen. Budget range $25K–$35K. Interested in quartz countertops and open shelving. Timeline is flexible — hoping to start in 6–8 weeks.",
    recommendedAction:
      "Schedule in-home consultation for next week. Send portfolio of recent kitchen projects and financing options before the visit.",
    submittedAt: "Yesterday",
  },
  {
    id: "3",
    customerName: "Emily Chen",
    email: "emily.chen@yahoo.com",
    phone: "(512) 555-0391",
    serviceNeeded: "Roof inspection after storm",
    urgency: "High",
    status: "Qualified",
    aiSummary:
      "Recent hailstorm caused visible damage to shingles on the south-facing roof. Insurance claim may be involved. Customer has photos ready and wants inspection before filing.",
    recommendedAction:
      "Confirm inspection appointment for tomorrow morning. Request photos via text. Prepare insurance documentation checklist.",
    submittedAt: "3 days ago",
  },
  {
    id: "4",
    customerName: "Michael Thompson",
    email: "mthompson@workmail.com",
    phone: "(512) 555-0518",
    serviceNeeded: "Lawn care — recurring service",
    urgency: "Low",
    status: "New",
    aiSummary:
      "New homeowner seeking weekly lawn maintenance for a 0.25-acre property. Interested in mowing, edging, and seasonal fertilization. Price-sensitive but values reliability.",
    recommendedAction:
      "Send tiered pricing for weekly and bi-weekly plans. Highlight first-visit discount and online scheduling convenience.",
    submittedAt: "5 hours ago",
  },
  {
    id: "5",
    customerName: "Lisa Park",
    email: "lisa.park@gmail.com",
    phone: "(512) 555-0673",
    serviceNeeded: "Water heater replacement",
    urgency: "Medium",
    status: "Closed",
    aiSummary:
      "50-gallon gas water heater is 12 years old with rust at the base. No active leak yet. Customer wants a tankless upgrade quote alongside standard replacement options.",
    recommendedAction:
      "Job completed. Follow up in 30 days for satisfaction check and ask for a Google review.",
    submittedAt: "1 week ago",
  },
];
