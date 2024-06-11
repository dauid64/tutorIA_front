import { loadFlash } from "sveltekit-flash-message/server";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = loadFlash(async (event) => {
  const session = await event.locals.getSession()

  return {
    session,
  };
})