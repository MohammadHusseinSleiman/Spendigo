export async function onRequest(context) {
    const url = new URL(context.request.url);

    const backendUrl =
        `https://spendigo.great-site.net/backend/api` +
        `${url.pathname.replace(/^\/api/, "")}` +
        `${url.search}`;

    // Handle browser preflight requests at Cloudflare.
    if (context.request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": url.origin,
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
            },
        });
    }

    const headers = new Headers(context.request.headers);

    // The backend is called server-to-server, so browser CORS is unnecessary.
    headers.delete("Origin");
    headers.delete("Host");

    const request = new Request(backendUrl, {
        method: context.request.method,
        headers,
        body:
            context.request.method === "GET" ||
            context.request.method === "HEAD"
                ? undefined
                : context.request.body,
    });

    return fetch(request);
}
