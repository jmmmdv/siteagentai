type EmbedCodeCardProps = {
  appUrl: string;
  widgetKey: string;
  businessName: string;
};

export function EmbedCodeCard({
  appUrl,
  widgetKey,
  businessName,
}: EmbedCodeCardProps) {
  const widgetUrl = `${appUrl}/widget/${widgetKey}`;
  const iframeCode = `<iframe src="${widgetUrl}" title="SiteAgentAI" width="100%" height="680" style="border:0;border-radius:16px;max-width:420px;" loading="lazy"></iframe>`;

  return (
    <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
        Website embed
      </p>
      <h2 className="mt-2 text-xl font-bold text-white">
        Add the AI employee to {businessName}
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Share this link or iframe on your website. Leads will appear in this
        dashboard automatically.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Widget page
          </p>
          <a
            href={widgetUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block break-all text-sm text-cyan-400 hover:underline"
          >
            {widgetUrl}
          </a>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Iframe embed code
          </p>
          <pre className="mt-2 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs leading-relaxed text-slate-300">
            {iframeCode}
          </pre>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Widget key
          </p>
          <p className="mt-1 break-all font-mono text-sm text-slate-300">
            {widgetKey}
          </p>
        </div>
      </div>
    </section>
  );
}
