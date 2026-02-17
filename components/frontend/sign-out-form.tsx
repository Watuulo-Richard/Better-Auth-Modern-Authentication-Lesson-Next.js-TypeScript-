"use client"

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'
import { signOut } from '@/lib/auth-client'

export default function SignOutForm() {
   const router = useRouter()
   const handleLogout = async () => {
      await signOut({
         fetchOptions: {
            onRequest: () => {
               toast.loading('Logging out...')
            },
            onSuccess: () => {
               toast.dismiss()
               router.push('/');
               toast.success('Logged out successfully')
            },
            onError: (ctx) => {
               toast.dismiss()
               toast.error(ctx.error.message)
            },
         },
      })
   }
   return (
      <Button variant={"destructive"} onClick={()=>handleLogout()}>
         <LogOut className="mr-2 h-4 w-4" />
         SignOut
      </Button>
   )
}
