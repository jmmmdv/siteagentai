export type LeadStatus = "New" | "Contacted" | "Qualified" | "Closed";

export type Urgency = "Low" | "Medium" | "High";

export type Lead = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  message: string;
  urgency: Urgency;
  status: LeadStatus;
  aiSummary: string;
  recommendedAction: string;
  submittedAt: string;
};

export type CreateLeadInput = {
  name: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  urgency: Urgency;
  message: string;
};
