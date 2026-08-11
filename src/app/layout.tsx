import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Runeterra FRP", template: "%s · Runeterra FRP" },
  description: "Runeterra'dan esinlenen bağımsız Türkçe d20 sistemi, rehber ve karakter oluşturucu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <div className="world-glow" aria-hidden="true" />
        <SiteHeader />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="shell footer-inner">
            <div><strong>Runeterra FRP</strong><p>Hayran yapımı, ticari olmayan bağımsız sistem.</p></div>
            <p>Riot Games tarafından onaylanmış resmî bir ürün değildir.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
