import { signUpSchema } from "@/app/lib/type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json()
  const result = signUpSchema.safeParse(body)
  let zodErrors: { [key: string]: any } = {}
  if (!result.success) {
    result.error.issues.map(issue => {
      const path = (issue.path[0] as string)
      zodErrors[path] = issue.message
    })
  }

  if( Object.keys(zodErrors).length > 0 ){
    return NextResponse.json({errors: zodErrors}, {status: 400})
  }else{
    return NextResponse.json({succes: true}, {status: 200})
  }
}