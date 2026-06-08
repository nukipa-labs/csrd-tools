// Lead-capture proxy. Forms POST here (NOT directly to the gateway) so the
// tenant host can be resolved server-side via X-Forwarded-Host - sidestepping
// client-host tenant-resolution issues.

export async function POST(req: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid request' }, { status: 400 });
  }

  const { slug, ...fields } = payload as { slug?: string } & Record<string, unknown>;
  const allowed = ['newsletter', 'scope-checker', 'emissions-calculator', 'materiality-matrix', 'supplier-pack', 'contact', 'dma-workbook', 'esrs-checklist'];

  if (!slug || !allowed.includes(slug)) {
    return Response.json({ ok: false, error: 'unknown form' }, { status: 400 });
  }
  if (!fields.email) {
    return Response.json({ ok: false, error: 'email required' }, { status: 400 });
  }

  const r = await fetch(
    `${process.env.NUKIPA_GATEWAY_URL}/public/v1/forms/${slug}/submit`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-Host': process.env.NUKIPA_TENANT_HOST ?? ''
      },
      body: JSON.stringify(fields)
    }
  );

  if (!r.ok) {
    const b = await r.json().catch(() => null);
    return Response.json(
      { ok: false, error: b?.error?.message || `HTTP ${r.status}` },
      { status: 502 }
    );
  }
  return Response.json({ ok: true });
}
