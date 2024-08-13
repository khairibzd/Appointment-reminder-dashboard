
import { createBrowserClient, createServerClient} from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient(noCookie = false) {
    // const cookieStore = cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
            
                getAll() {

                    if (noCookie) return null;

                    return cookies().getAll()
                },
                setAll(cookiesToSet) {
                    if (noCookie) return;

                    cookiesToSet.forEach(({ name, value, options }) => cookies().set(name, value, options))
                },
            },
        }
    )
}


export function createClientB() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }