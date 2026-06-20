/**
 * DevForge Studio - AI Proxy Edge Function
 * Handles requests from frontend to AI providers (SumoPod/OpenRouter)
 * to bypass CORS and manage security.
 * Now using Edge Runtime to stream responses and bypass the 60s timeout limit.
 */

export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  // 1. Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { 
      status: 405, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    const body = await req.json();
    const { provider, apiUrl, apiKey, payload } = body;

    if (!apiUrl || !apiKey || !payload) {
      return new Response(JSON.stringify({ error: 'Missing required fields: apiUrl, apiKey, or payload' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    console.log(`[Proxy Edge] Forwarding request to ${provider}: ${apiUrl}`);

    // 2. Perform the actual request to the AI Provider from the edge
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        ...(provider === 'openrouter' ? {
          'HTTP-Referer': 'https://devforge.studio',
          'X-Title': 'DevForge Studio'
        } : {})
      },
      body: JSON.stringify(payload)
    });

    // 3. Handle non-JSON responses (security/errors)
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok && !contentType.includes('application/json')) {
      const text = await response.text();
      console.warn(`[Proxy Edge] Provider returned non-JSON (${response.status}):`, text.substring(0, 200));
      return new Response(JSON.stringify({ 
        error: `Provider AI (${provider}) mengembalikan respon non-JSON (Status: ${response.status}).`,
        message: text.substring(0, 200) || 'Respon kosong atau bukan JSON.'
      }), { 
        status: response.status, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // 4. Return the RAW ReadableStream back to the frontend!
    // This allows Vercel Edge to stream the response as it arrives,
    // COMPLETELY BYPASSING the 10s/60s Serverless Execution Timeout limit.
    // The frontend's `await res.json()` will consume this stream smoothly.
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': contentType || 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-transform'
      }
    });

  } catch (error) {
    console.error('[Proxy Edge Error]', error);
    return new Response(JSON.stringify({ 
      error: 'Terjadi kesalahan sistem pada Proxy Edge.',
      message: error.message 
    }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}
