import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Private preview: /api/preview?secret=…  turns on "show drafts" for this browser.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = process.env.PREVIEW_SECRET;
  if (!secret || searchParams.get("secret") !== secret) {
    return new Response("Invalid or missing secret", { status: 401 });
  }
  (await draftMode()).enable();
  redirect("/");
}
