import { auth0 } from "@/lib/auth0";
import { permanentRedirect } from "next/navigation";

import { Spinner } from "@/components/Spinner";

export default async function Dashboard() {
  const session = await auth0.getSession();

  return (
    <div className="flex flex-col flex-wrap justify-center items-center min-h-dvh">
      <Spinner size="large" show={true} />
      <p className="mt-4">Loading YU Meeting Dashboard ...</p>
      {session ? permanentRedirect("/dashboard") : permanentRedirect("/login")}
    </div>
  );
}
