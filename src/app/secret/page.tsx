import { auth } from "@/auth"
import Image from "next/image"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Lock } from "lucide-react"

export default async function Secret() {
  const session = await auth()

  if (!session) return redirect('/profile')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
          <CardTitle className="text-2xl font-bold">Secret Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={session.user?.image || "/placeholder.svg?height=64&width=64"}
                alt="Profile"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div>
              <p className="font-semibold text-lg">{session.user?.name}</p>
              <p className="text-sm text-muted-foreground">{session.user?.email}</p>
            </div>
          </div>
          <p className="text-center text-muted-foreground">
            Welcome to the secret page! This content is only visible to authenticated users.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}