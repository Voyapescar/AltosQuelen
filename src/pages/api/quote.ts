import type { APIRoute } from 'astro';
import { z } from 'zod';

export const prerender = false;

const quoteSchema = z.object({
  nombre: z
    .string()
    .min(2, 'Nombre requerido')
    .max(100),
  telefono: z
    .string()
    .regex(/^\+56\s?9\s?\d{4}\s?\d{4}$/, 'Teléfono inválido'),
  email: z.string().email('Email inválido'),
  ubicacion: z.string().min(1, 'Ubicación requerida'),
  presupuesto: z.string().min(1, 'Presupuesto requerido'),
  descripcion: z
    .string()
    .min(20, 'Descripción muy corta')
    .max(2000, 'Descripción muy larga'),
});

export const POST: APIRoute = async ({ request }) => {
  /* ── Validate Content-Type ── */
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return new Response(
      JSON.stringify({ success: false, error: 'Content-Type debe ser application/json' }),
      { status: 415, headers: { 'Content-Type': 'application/json' } }
    );
  }

  /* ── Parse & Validate Body ── */
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Cuerpo JSON inválido' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({
        success: false,
        error:  'Datos de formulario inválidos',
        issues: parsed.error.flatten().fieldErrors,
      }),
      { status: 422, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const lead = parsed.data;

  /* ── Process Lead ─────────────────────────────────────────────────────────
   * Aquí puedes conectar con cualquier servicio de email transaccional.
   * Opciones recomendadas:
   *   - Resend:    https://resend.com  (npm install resend)
   *   - SendGrid:  https://sendgrid.com
   *   - Postmark:  https://postmarkapp.com
   *
   * Variables de entorno necesarias (definir en .env):
   *   EMAIL_SERVICE_API_KEY = TU_API_KEY_AQUI
   *   EMAIL_FROM            = noreply@TU_DOMINIO.cl
   *   EMAIL_TO              = contacto@TU_DOMINIO.cl
   *
   * Ejemplo con Resend (descomentar y ajustar al instalar):
   *
   * import { Resend } from 'resend';
   * const resend = new Resend(import.meta.env.EMAIL_SERVICE_API_KEY);
   *
   * await resend.emails.send({
   *   from:    import.meta.env.EMAIL_FROM,
   *   to:      import.meta.env.EMAIL_TO,
   *   subject: `Nuevo Lead: ${lead.nombre} — ${lead.ubicacion}`,
   *   text: [
   *     `Nombre:      ${lead.nombre}`,
   *     `Teléfono:    ${lead.telefono}`,
   *     `Email:       ${lead.email}`,
   *     `Ubicación:   ${lead.ubicacion}`,
   *     `Presupuesto: ${lead.presupuesto}`,
   *     `Descripción: ${lead.descripcion}`,
   *   ].join('\n'),
   * });
   * ────────────────────────────────────────────────────────────────────── */

  /* ── Structured log (visible en servidor) ── */
  console.info('[quote] Nuevo lead recibido', {
    nombre:      lead.nombre,
    email:       lead.email,
    ubicacion:   lead.ubicacion,
    presupuesto: lead.presupuesto,
    timestamp:   new Date().toISOString(),
  });

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Solicitud recibida correctamente. Te contactaremos en las próximas 24 horas.',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    }
  );
};

/* ── Block non-POST methods ── */
export const GET: APIRoute = () =>
  new Response(JSON.stringify({ error: 'Método no permitido' }), {
    status: 405,
    headers: { Allow: 'POST', 'Content-Type': 'application/json' },
  });
