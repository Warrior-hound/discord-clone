"use client"
import { useSession, signOut, signIn } from "next-auth/react";

const SignInButton = () => {
    const { data: session } = useSession()
   
    if(session && session.user) {
        return (<div>
            <button onClick={() => signOut()}>Sign Out Bruv</button>
        </div>)
    }
    return ( <div><button onClick={() => signIn("google")}>Sign In Bruv</button></div>  );
}
 
export default SignInButton;