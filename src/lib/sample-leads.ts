import type { Lead } from "@/lib/lead-types";

export type SampleLead = Lead;

export const sampleLeads: Lead[] = [
  {
    id: "sample-1",
    customerName: "Sarah Mitchell",
    email: "sarah.mitchell@gmail.com",
    phone: "(512) 555-0142",
    serviceNeeded: "Emergency AC repair",
    message:
      "Our AC stopped working last night during the heat wave. The unit is about 8 years old and making clicking sounds. We're home all day and prefer an afternoon visit if possible.",
    urgency: "High",
    status: "New",
    aiSummary:
      "Homeowner reports AC stopped working during a heat wave. Unit is 8 years old, making unusual clicking sounds. Likely compressor or capacitor issue. Customer is available today and prefers afternoon visits.",
    recommendedAction:
      "Call within 15 minutes. Offer same-day diagnostic visit between 2–5 PM. Mention seasonal maintenance plan after repair.",
    submittedAt: "2 hours ago",
  },
  {
    id: "sample-2",
    customerName: "James Rodriguez",
    email: "j.rodriguez@outlook.com",
    phone: "(512) 555-0287",
    serviceNeeded: "Kitchen remodel consultation",
    message:
      "We want to remodel our 150 sq ft kitchen with quartz countertops and open shelving. Budget is roughly $25K–$35K and we'd like to start in 6–8 weeks.",
    urgency: "Medium",
    status: "Contacted",
    aiSummary:
      "Looking to remodel a 150 sq ft kitchen. Budget range $25K–$35K. Interested in quartz countertops and open shelving. Timeline is flexible — hoping to start in 6–8 weeks.",
    recommendedAction:
      "Schedule in-home consultation for next week. Send portfolio of recent kitchen projects and financing options before the visit.",
    submittedAt: "Yesterday",
  },
  {
    id: "sample-3",
    customerName: "Emily Chen",
    email: "emily.chen@yahoo.com",
    phone: "(512) 555-0391",
    serviceNeeded: "Roof inspection after storm",
    message:
      "We had hail damage on the south-facing roof after last week's storm. I have photos and may need to file an insurance claim. Can someone inspect before we call the insurer?",
    urgency: "High",
    status: "Qualified",
    aiSummary:
      "Recent hailstorm caused visible damage to shingles on the south-facing roof. Insurance claim may be involved. Customer has photos ready and wants inspection before filing.",
    recommendedAction:
      "Confirm inspection appointment for tomorrow morning. Request photos via text. Prepare insurance documentation checklist.",
    submittedAt: "3 days ago",
  },
  {
    id: "sample-4",
    customerName: "Michael Thompson",
    email: "mthompson@workmail.com",
    phone: "(512) 555-0518",
    serviceNeeded: "Lawn care — recurring service",
    message:
      "New homeowner looking for weekly lawn maintenance on a 0.25-acre lot — mowing, edging, and seasonal fertilization. Reliable service matters more than the lowest price.",
    urgency: "Low",
    status: "New",
    aiSummary:
      "New homeowner seeking weekly lawn maintenance for a 0.25-acre property. Interested in mowing, edging, and seasonal fertilization. Price-sensitive but values reliability.",
    recommendedAction:
      "Send tiered pricing for weekly and bi-weekly plans. Highlight first-visit discount and online scheduling convenience.",
    submittedAt: "5 hours ago",
  },
  {
    id: "sample-5",
    customerName: "Lisa Park",
    email: "lisa.park@gmail.com",
    phone: "(512) 555-0673",
    serviceNeeded: "Water heater replacement",
    message:
      "Our 50-gallon gas water heater is 12 years old with rust at the base. No active leak yet. Interested in both a standard replacement quote and a tankless upgrade option.",
    urgency: "Medium",
    status: "Closed",
    aiSummary:
      "50-gallon gas water heater is 12 years old with rust at the base. No active leak yet. Customer wants a tankless upgrade quote alongside standard replacement options.",
    recommendedAction:
      "Job completed. Follow up in 30 days for satisfaction check and ask for a Google review.",
    submittedAt: "1 week ago",
  },
];
