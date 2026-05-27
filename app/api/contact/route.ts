import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { nom, email, sujet, message } = await req.json();

  console.log('[contact] reçu :', { nom, email, sujet });
  console.log('[contact] BREVO_API_KEY présente :', !!process.env.BREVO_API_KEY);

  if (!nom || !email || !message) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
  }

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: { name: 'By SevIA - Contact', email: 'sevmyway@hotmail.com' },
      to: [{ email: 'sevmyway@hotmail.com', name: 'Séverine BIRS' }],
      replyTo: { email, name: nom },
      subject: `[By SevIA] ${sujet} — ${nom}`,
      htmlContent: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto">
          <h2 style="color:#00B4D8">Nouveau message — By SevIA</h2>
          <p><strong>Nom :</strong> ${nom}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${sujet}</p>
          <hr style="border-color:#C9A84C"/>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.log('[contact] Brevo erreur', res.status, err);
    return NextResponse.json({ error: err }, { status: 500 });
  }

  console.log('[contact] Brevo OK', res.status);
  return NextResponse.json({ ok: true });
}
