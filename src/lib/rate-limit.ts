import type { NextRequest } from "next/server";

const WINDOW_MS = 15 * 60 * 1000;
const IP_LIMIT = 5;
const EMAIL_LIMIT = 3;
const hits = new Map<string, number[]>();

function recentHits(key: string, now: number): number[] {
  const kept = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  if (kept.length === 0) hits.delete(key);
  else hits.set(key, kept);
  return kept;
}

function allow(key: string, limit: number, now: number): boolean {
  const kept = recentHits(key, now);
  if (kept.length >= limit) return false;
  kept.push(now);
  hits.set(key, kept);
  return true;
}

export function clientAddress(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  if (first) return first.slice(0, 64);
  return request.headers.get("x-real-ip")?.trim().slice(0, 64) || "unknown";
}

/** Five submissions per 15 minutes for a visitor, and three for one email address. */
export function allowPublicSubmission(address: string, email: string): boolean {
  const now = Date.now();
  const visitorKey = `ip:${address}`;
  const emailKey = `email:${email.trim().toLowerCase()}`;
  if (!allow(visitorKey, IP_LIMIT, now)) return false;
  if (!allow(emailKey, EMAIL_LIMIT, now)) return false;
  return true;
}
