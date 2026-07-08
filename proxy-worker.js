export default {
  async fetch(request) {
    const CORS = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "*",
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }
    const reqUrl = new URL(request.url);
    const target = reqUrl.searchParams.get("url");
    if (!target) {
      return new Response("Missing ?url= parameter", { status: 400, headers: CORS });
    }
    // Only allow proxying to the providers KURMI AI actually uses
    const allowed = [
      "api.openai.com",
      "generativelanguage.googleapis.com",
      "api.deepseek.com",
      "api.cerebras.ai",
      "api.mistral.ai",
      "openrouter.ai",
      "api-inference.huggingface.co",
      "router.huggingface.co",
    ];
    let targetHost;
    try {
      targetHost = new URL(target).hostname;
    } catch (e) {
      return new Response("Invalid target URL", { status: 400, headers: CORS });
    }
    if (!allowed.includes(targetHost)) {
      return new Response("Target host not allowed", { status: 403, headers: CORS });
    }

    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("origin");
    headers.delete("referer");

    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer(),
    });

    const respHeaders = new Headers(upstream.headers);
    Object.entries(CORS).forEach(([k, v]) => respHeaders.set(k, v));

    return new Response(upstream.body, {
      status: upstream.status,
      headers: respHeaders,
    });
  },
};
