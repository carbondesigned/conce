import { Link } from "@remix-run/react";
import { Layout } from "components/Layout";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <Layout>
      <h1 className="text-red-400">Conce</h1>
    </Layout>
  );
}
