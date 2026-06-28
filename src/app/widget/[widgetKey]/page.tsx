import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WebsiteAssistant } from "@/components/WebsiteAssistant";
import { getBusinessByWidgetKey } from "@/lib/businesses";
import { isDatabaseConfigured } from "@/lib/db";

export const metadata: Metadata = {
  title: "AI Website Employee",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type WidgetPageProps = {
  params: Promise<{ widgetKey: string }>;
};

export default async function WidgetPage({ params }: WidgetPageProps) {
  const { widgetKey } = await params;

  if (!isDatabaseConfigured()) {
    notFound();
  }

  const business = await getBusinessByWidgetKey(widgetKey);
  if (!business) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <WebsiteAssistant widgetKey={widgetKey} defaultOpen />
    </div>
  );
}
