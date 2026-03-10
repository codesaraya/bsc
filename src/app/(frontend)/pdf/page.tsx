import { Metadata } from "next";
import PdfShowcase from "./PdfShowcase";

export const metadata: Metadata = {
  title: "UI Prezentacija | BSC - Best Solution Company",
  description:
    "Kompletna prezentacija korisničkog interfejsa (UI) svih stranica i sekcija BSC web stranice.",
};

export default function PdfPage() {
  return <PdfShowcase />;
}
