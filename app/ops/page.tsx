"use client";

import { useEffect, useState } from "react";
import "./ops.css";

type Campaign = {
  id: string;
  platform: "meta" | "google";
  external_campaign_id: string | null;
  hook: string;
  utm_campaign: string;
  daily_budget_cents: number;
  status: "draft" | "active" | "paused" | "failed" | "ended";
  status_detail: string | null;
  created_at: string;
};

type UtmRow = { utm_campaign: string | null; utm_source: string | null; signups: number };

type Summary = {
  campaigns: Campaign[];
  totalObservedSpentCents: number;
  utmBreakdown: UtmRow[];
  caps: { dailyBudgetCentsCap: number; lifetimeSpendCentsCap: number };
};

const dollars = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default function AdsDashboard() {
  const [key, setKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ platform: "meta" as "meta" | "google", hook: "", utmCampaign: "", dailyBudgetDollars: "5" });

  useEffect(() => {
    const stored = localStorage.getItem("yolk_ops_key");
    if (stored) setKey(stored);
  }, []);

  async function load(k: string) {
    setError(null);
    const res = await fetch("/api/ops/summary", { headers: { "x-ads-key": k } });
    if (res.status === 401) {
      setError("wrong key");
      localStorage.removeItem("yolk_ops_key");
      setKey(null);
      return;
    }
    const data = await res.json();
    if (!data.ok) { setError(data.error || "failed to load"); return; }
    setSummary(data);
  }

  useEffect(() => {
    if (key) load(key);
  }, [key]);

  function submitKey(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("yolk_ops_key", keyInput);
    setKey(keyInput);
  }

  async function createCampaign(e: React.FormEvent) {
    e.preventDefault();
    if (!key) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/ops/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-ads-key": key },
        body: JSON.stringify({
          platform: form.platform,
          hook: form.hook,
          utmCampaign: form.utmCampaign,
          dailyBudgetCents: Math.round(parseFloat(form.dailyBudgetDollars) * 100),
        }),
      });
      const data = await res.json();
      if (!data.ok) setError(data.error || "create failed");
      else setForm({ ...form, hook: "", utmCampaign: "" });
      await load(key);
    } finally {
      setBusy(false);
    }
  }

  async function pause(id: string) {
    if (!key) return;
    setBusy(true);
    try {
      await fetch(`/api/ops/campaigns/${id}/pause`, { method: "POST", headers: { "x-ads-key": key } });
      await load(key);
    } finally {
      setBusy(false);
    }
  }

  async function killSwitch() {
    if (!key) return;
    if (!confirm("pause every active campaign on every platform?")) return;
    setBusy(true);
    try {
      await fetch("/api/ops/kill-switch", { method: "POST", headers: { "x-ads-key": key } });
      await load(key);
    } finally {
      setBusy(false);
    }
  }

  if (!key) {
    return (
      <div className="ops">
        <div className="ops-gate">
          <div className="ops-gate-card">
            <div className="ops-gate-icon" />
            <div className="ops-eyebrow" style={{ marginBottom: 6 }}>internal</div>
            <div className="ops-gate-title">ops console</div>
            <div className="ops-gate-sub">enter the key to see spend, campaigns, and UTM attribution.</div>
            <form onSubmit={submitKey}>
              {error && <p className="ops-error">{error}</p>}
              <input
                type="password"
                placeholder="access key"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="ops-input"
                autoFocus
              />
              <button type="submit" className="ops-btn ops-btn-primary ops-btn-block">enter</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const spentPct = summary ? Math.min(100, (summary.totalObservedSpentCents / summary.caps.lifetimeSpendCentsCap) * 100) : 0;
  const activeCount = summary?.campaigns.filter((c) => c.status === "active").length ?? 0;
  const totalSignups = summary?.utmBreakdown.reduce((sum, r) => sum + r.signups, 0) ?? 0;
  const maxSignups = Math.max(1, ...(summary?.utmBreakdown.map((r) => r.signups) ?? [1]));

  return (
    <div className="ops">
      <div className="ops-topbar">
        <div className="ops-brand">
          <div className="ops-brand-dot" />
          <div className="ops-brand-text">yolkling <span>ops</span></div>
        </div>
        <button onClick={killSwitch} disabled={busy || !summary} className="ops-btn ops-btn-danger">
          pause everything
        </button>
      </div>

      <div className="ops-body">
        {error && <p className="ops-error">{error}</p>}

        {summary && (
          <>
            <section className="ops-hero">
              <div className="ops-hero-spend">
                <div className="ops-eyebrow">lifetime spend</div>
                <div className="ops-hero-amount">
                  {dollars(summary.totalObservedSpentCents)} <span>/ {dollars(summary.caps.lifetimeSpendCentsCap)}</span>
                </div>
                <div className="ops-progress-track">
                  <div className="ops-progress-fill" style={{ width: `${spentPct}%` }} />
                </div>
                <div className="ops-hero-cap">{dollars(summary.caps.dailyBudgetCentsCap)}/day hard cap, per platform</div>
              </div>
              <div className="ops-hero-stats">
                <div className="ops-stat">
                  <div className="ops-stat-num">{activeCount}</div>
                  <div className="ops-stat-label">active</div>
                </div>
                <div className="ops-stat">
                  <div className="ops-stat-num">{summary.campaigns.length}</div>
                  <div className="ops-stat-label">campaigns</div>
                </div>
                <div className="ops-stat">
                  <div className="ops-stat-num">{totalSignups}</div>
                  <div className="ops-stat-label">tagged signups</div>
                </div>
              </div>
            </section>

            <section className="ops-card">
              <div className="ops-card-title">launch a campaign</div>
              <div className="ops-segmented">
                <button type="button" className={form.platform === "meta" ? "is-active" : ""} onClick={() => setForm({ ...form, platform: "meta" })}>meta</button>
                <button type="button" className={form.platform === "google" ? "is-active" : ""} onClick={() => setForm({ ...form, platform: "google" })}>google</button>
              </div>
              <form onSubmit={createCampaign} className="ops-form-grid">
                <input placeholder="hook, e.g. contrast" value={form.hook} onChange={(e) => setForm({ ...form, hook: e.target.value })} className="ops-input" required />
                <input placeholder="utm campaign id" value={form.utmCampaign} onChange={(e) => setForm({ ...form, utmCampaign: e.target.value })} className="ops-input" required />
                <input placeholder="daily budget $" value={form.dailyBudgetDollars} onChange={(e) => setForm({ ...form, dailyBudgetDollars: e.target.value })} className="ops-input" required />
                <button type="submit" disabled={busy} className="ops-btn ops-btn-primary">create + launch</button>
              </form>
            </section>

            <section className="ops-card">
              <div className="ops-card-title">campaigns</div>
              <table className="ops-table">
                <thead>
                  <tr>
                    <th>platform</th>
                    <th>hook</th>
                    <th>utm</th>
                    <th>daily</th>
                    <th>status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {summary.campaigns.map((c) => (
                    <tr key={c.id}>
                      <td>{c.platform}</td>
                      <td>{c.hook}</td>
                      <td>{c.utm_campaign}</td>
                      <td>{dollars(c.daily_budget_cents)}</td>
                      <td>
                        <span className={`ops-status ops-status-${c.status}`} title={c.status_detail || ""}>
                          <span className="ops-status-dot" />
                          {c.status}
                        </span>
                      </td>
                      <td>
                        {c.status === "active" && (
                          <button onClick={() => pause(c.id)} disabled={busy} className="ops-pause-btn">pause</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {summary.campaigns.length === 0 && (
                    <tr><td colSpan={6} className="ops-table-empty">nothing launched yet</td></tr>
                  )}
                </tbody>
              </table>
            </section>

            <section className="ops-card">
              <div className="ops-card-title">waitlist signups by UTM</div>
              <table className="ops-table">
                <thead>
                  <tr>
                    <th>utm_campaign</th>
                    <th>utm_source</th>
                    <th>signups</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.utmBreakdown.map((r, i) => (
                    <tr key={i}>
                      <td>{r.utm_campaign}</td>
                      <td>{r.utm_source}</td>
                      <td>
                        <div className="ops-bar-cell">
                          <span>{r.signups}</span>
                          <div className="ops-bar-track">
                            <div className="ops-bar-fill" style={{ width: `${(r.signups / maxSignups) * 100}%` }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {summary.utmBreakdown.length === 0 && (
                    <tr><td colSpan={3} className="ops-table-empty">no tagged signups yet</td></tr>
                  )}
                </tbody>
              </table>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
