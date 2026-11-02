import Header from "./Header";
import { getHeaderLinks } from "@/lib/content";

/** Server wrapper: pulls the editable header links from Sanity. */
export default async function SiteHeader({ variant }: { variant: "home" | "page" }) {
  const links = await getHeaderLinks();
  return <Header variant={variant} links={links} />;
}
