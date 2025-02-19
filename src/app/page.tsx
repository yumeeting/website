import { permanentRedirect } from "next/navigation";

import { auth0 } from "@/lib/auth0";

export default async function Dashboard() {
  const session = await auth0.getSession();

  if (session) {
    permanentRedirect("/dashboard");
  } else {
    permanentRedirect("/login");
  }
}
