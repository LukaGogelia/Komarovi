import { getServerSession } from "next-auth";
import HeaderDashboard from "./HeaderDashboard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getPersonById from "@/data/mongoDb/getPersonById";

export default async function ServerHeaderDashboard() {
  const session = await getServerSession(authOptions);
  const person = await getPersonById(session?.user.name);
  return <HeaderDashboard profilePictureUrl={person.profilePictureUrl} />;
}
