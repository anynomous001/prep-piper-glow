import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
}

// Lightweight SEO helper without external deps
export const SEO = ({ title, description, canonical = "/" }: SEOProps) => {
  useEffect(() => {
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description ?? "");

    let linkCanonical = document.querySelector("link[rel='canonical']");
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonical);

    // Basic JSON-LD
    const elId = "pp-jsonld";
    const existing = document.getElementById(elId) as HTMLScriptElement | null;
    const script = existing ?? (document.createElement("script") as HTMLScriptElement);
    script.id = elId;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Prep Piper",
      applicationCategory: "BusinessApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: description ?? "Real-time AI voice interview platform"
    });
    if (!existing) document.head.appendChild(script);
  }, [title, description, canonical]);

  return null;
};
