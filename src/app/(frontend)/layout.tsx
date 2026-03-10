import { Poppins } from "next/font/google";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getLocale } from "@/lib/locale";
import { getImageUrl } from "@/lib/imageUrl";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config });
    const locale = await getLocale();
    const ss: any = await payload.findGlobal({ slug: 'site-settings' as any, locale } as any);

    const faviconUrl = getImageUrl(ss?.logos?.favicon);
    const appleTouchUrl = getImageUrl(ss?.logos?.faviconApple);

    const icons: Metadata['icons'] = {};
    if (faviconUrl) {
      icons.icon = faviconUrl;
    }
    if (appleTouchUrl) {
      icons.apple = appleTouchUrl;
    }

    return {
      icons: (faviconUrl || appleTouchUrl) ? icons : undefined,
    };
  } catch {
    return {};
  }
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const payload = await getPayload({ config });

  const [navigationData, footerData, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: 'navigation' as any, locale } as any).catch(() => null),
    payload.findGlobal({ slug: 'footer' as any, locale } as any).catch(() => null),
    payload.findGlobal({ slug: 'site-settings' as any, locale } as any).catch(() => null),
  ]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased font-sans`} suppressHydrationWarning>
        <Navbar data={navigationData} siteSettings={siteSettings} locale={locale} />
        <main className="pt-[80px] bg-white">{children}</main>
        <Footer data={footerData} siteSettings={siteSettings} />
      </body>
    </html>
  );
}
