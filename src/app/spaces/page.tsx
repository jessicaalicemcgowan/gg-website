import { redirect } from "next/navigation";

// There's no standalone /spaces page anymore — the Spaces content lives on
// the homepage, reachable via the "#spaces" anchor (see SonRullanNarrative's
// "origins" block and Header.tsx's nav link). This route only exists so old
// links/bookmarks to /spaces still land somewhere useful.
export default function SpacesPage() {
  redirect("/#spaces");
}
