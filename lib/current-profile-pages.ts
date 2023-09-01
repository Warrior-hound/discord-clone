import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const currentProfilePages = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      email: session.user.email!
    }
  });

  return profile;
}