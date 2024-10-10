import { signIn, auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogIn, LogOut } from "lucide-react"

export default async function SignIn() {
  const session = await auth()
  const user = session?.user

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary/20 to-secondary/20">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Demo Google Auth</CardTitle>
          <CardDescription>Sign in or out using your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.image || ''} alt={user.name || 'User'} />
                <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              Not signed in. Click the button below to sign in with Google.
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {user ? (
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <Button type="submit" variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </form>
          ) : (
            <form
              action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/secret" })
              }}
            >
              <Button type="submit">
                <LogIn className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>
            </form>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}