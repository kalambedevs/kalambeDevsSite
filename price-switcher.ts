import { Context } from "@netlify/edge-functions";
// 🏎️ ADD THIS IMPORT LINE - This is the "Ferrari" engine for the HTML swap
import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

export default async (request: Request, context: Context) => {
  const response = await context.next();
  
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  // Detect Country
  const countryCode = context.geo?.country?.code || "US";
  console.log(`Visitor detected from: ${countryCode}`); // This will show in your Netlify logs!

  // Ferrari-Tier Price Mapping
  const prices = {
    AU: { starter: "$6,500 AUD", pro: "$18,000 AUD" },
    GB: { starter: "£3,500 GBP", pro: "£9,500 GBP" },
    AE: { starter: "16,500 AED", pro: "45,000 AED" },
    IN: { starter: "₹45,000 INR", pro: "₹1,25,000 INR" },
    US: { starter: "$4,500 USD", pro: "$12,500 USD" }
  };

  const selected = prices[countryCode as keyof typeof prices] || prices.US;

  // Transform the HTML before it leaves the server
  return new HTMLRewriter()
    .on("#price-starter", {
      element(element) {
        element.setInnerContent(selected.starter);
      },
    })
    .on("#price-pro", {
      element(element) {
        element.setInnerContent(selected.pro);
      },
    })
    .transform(response);
};