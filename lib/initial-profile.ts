
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db"

import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'

function generateSnowflake() {
    const timestamp = Date.now(); // Get current timestamp in milliseconds
    const timestampBits = (timestamp - 1420070400000) << 22; // 42 bits for timestamp
  
    const randomBits = Math.floor(Math.random() * (1 << 12)); // 12 random bits
    const snowflakeId = timestampBits | randomBits;
  
    return snowflakeId.toString();
  }

export const initialProfile = async () => {
    
    const user = await getServerSession(authOptions)
   
    if(!user || !user.user) {
        return null;
    } 
  
    const profile = await db.profile.findUnique({
        where: {
            email: user.user.email!
        }
    })
  
    if(profile) {
        return profile;
    }

    const newProfile = await db.profile.create({
        data: {
            userId: generateSnowflake(),
            name: `${user.user.name}`,
            imageUrl: 'https://cdn.discordapp.com/attachments/793442252076482560/1146852972849020968/discordblue.png',
            email: user.user.email!
        }
        
    })
    return newProfile
}