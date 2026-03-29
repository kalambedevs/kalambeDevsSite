import { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const response = await context.next();
  
  // Only process HTML
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  // Detect Country (Default to US/Global)
  const countryCode = context.geo?.country?.code || "US";

  // Ferrari-Tier Price Mapping (Top-Shelf Global Rates)
  const pricing = {
    AU: { s: "$6,500 AUD", p: "$18,000 AUD" },
    GB: { s: "£3,500 GBP", p: "£9,500 GBP" },
    AE: { s: "16,500 AED", p: "45,000 AED" },
    IN: { s: "₹45,000 INR", p: "₹1,25,000 INR" },
    US: { s: "$4,500 USD", p: "$12,500 USD" } // Default Global
  };

  const entry = pricing[countryCode as keyof typeof pricing] || pricing.US;

  // Get the full page content
  let text = await response.text();

  // The "invisible" swap logic
  // This looks for the default USD prices in your HTML and replaces them
  text = text.replace('$4,500 USD', entry.s);
  text = text.replace('$12,500 USD', entry.p);

  return new Response(text, response);
};