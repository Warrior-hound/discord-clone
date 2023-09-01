
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const currentProfile = async () => {
  const user = await getServerSession(authOptions)
   
  if (!user?.user) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      email: user.user.email!
    }
  });

  return profile;
}