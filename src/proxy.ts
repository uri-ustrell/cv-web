import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Per-request CSP nonce. Next.js auto-detects the nonce in this header and
 * stamps it onto its own inline hydration scripts, so no per-component
 * wiring is needed beyond emitting the header here.
 */
export const proxy = (request: NextRequest) => {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data:;
    font-src 'self';
    connect-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
  `
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', csp)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', csp)

  return response
}

export const config = {
  matcher: [
    /*
     * Skip static assets and image optimization requests — no HTML is
     * served there, so a CSP header on them is pointless.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
