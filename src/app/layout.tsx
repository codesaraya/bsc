import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "BSC - Best Solution Company",
    template: "%s",
  },
  description:
    "Specijalizirana digitalna štamparija u Sarajevu. UV štampa, brendiranje, tapete, 3D paneli i više.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
