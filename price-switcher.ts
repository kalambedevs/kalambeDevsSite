import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  // Get the response from the origin
  const response = await context.next();
  
  // Only process HTML responses
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  // Get the visitor's country code (default to US if undefined)
  const countryCode = context.geo?.country?.code || "US";

  // Default prices (US/Other)
  let starterPrice = "$4,500 USD";
  let proPrice = "$12,500 USD";

  // Map country codes to specific pricing tiers
  switch (countryCode) {
    case "AU":
      starterPrice = "$6,500 AUD";
      proPrice = "$18,000 AUD";
      break;
    case "GB":
      starterPrice = "£3,500 GBP";
      proPrice = "£9,500 GBP";
      break;
    case "AE":
      starterPrice = "16,500 AED";
      proPrice = "45,000 AED";
      break;
    case "IN":
      starterPrice = "₹45,000 INR";
      proPrice = "₹1,25,000 INR";
      break;
  }

  // Use HTMLRewriter to swap the prices before the page loads
  return new HTMLRewriter()
    .on("#price-starter", {
      element(element) {
        element.setInnerContent(starterPrice);
      },
    })
    .on("#price-pro", {
      element(element) {
        element.setInnerContent(proPrice);
      },
    })
    .transform(response);
};
