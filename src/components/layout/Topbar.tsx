"use client";

import { Facebook, Twitter, Instagram } from "lucide-react";
import { FaPinterestP } from "react-icons/fa";

const defaultSocialLinks = [
  { platform: "Facebook", url: "https://www.facebook.com/bscsarajevo" },
  { platform: "Twitter", url: "https://www.twitter.com" },
  { platform: "Instagram", url: "https://www.instagram.com" },
  { platform: "Pinterest", url: "https://www.pinterest.com" },
];

const platformIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook,
  Twitter,
  Instagram,
};

function getSocialIcon(platform: string) {
  if (platform === "Pinterest") {
    return FaPinterestP;
  }
  return platformIconMap[platform] || Facebook;
}

export default function Topbar({ siteSettings }: { siteSettings?: any }) {
  const socialLinks = siteSettings?.socialMedia || defaultSocialLinks;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gray-950 border-b border-white/5 text-sm py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Social icons */}
        <div className="flex items-center gap-3 text-gray-500">
          {socialLinks.map((social: any, i: number) => {
            const Icon = getSocialIcon(social.platform);
            return (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-violet-400 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
