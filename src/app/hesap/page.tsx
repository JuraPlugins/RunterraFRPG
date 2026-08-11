import type { Metadata } from "next";
import { AccountHub } from "@/components/account-hub";
import "./account.css";

export const metadata: Metadata = { title: "Hesap ve Session Odaları", description: "Runeterra FRP hesabı, avatarı ve session odaları." };

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const nextPath = (await searchParams).next;
  return <AccountHub nextPath={nextPath?.startsWith("/") ? nextPath : ""} />;
}
