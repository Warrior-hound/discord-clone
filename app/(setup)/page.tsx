
import { db } from "@/lib/db"
import { redirect } from 'next/navigation'
import {SessionProvider} from "next-auth/react"
import { initialProfile } from "@/lib/initial-profile"
import { InitialModal } from "@/components/modals/initial-modal"

const SetupPage = async () => {
 
   
    const profile = await initialProfile()
  
    if(!profile) {
        return redirect('/sign-in')
    }

    const server = await db.server.findFirst({
        where: {
            members: {
                some:{
                    profileId: profile.id
                }
            }
        }
    })

    if (server) {
        return redirect(`/servers/${server.id}`)
    }
    return (<InitialModal />);
}
 
export default SetupPage;