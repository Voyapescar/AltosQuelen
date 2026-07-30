import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const cotizacionSchema = z.object({
  nombre: z
    .string()
    .min(2, 'Ingresa tu nombre completo')
    .max(100, 'Nombre demasiado largo'),
  telefono: z
    .string()
    .regex(
      /^\+56\s?9\s?\d{4}\s?\d{4}$/,
      'Formato requerido: +56 9 XXXX XXXX'
    ),
  email: z.string().email('Ingresa un email válido'),
  motivo: z.string().min(1, 'Selecciona un motivo de consulta'),
  pasajeros: z.string().min(1, 'Selecciona una cantidad de personas'),
  descripcion: z
    .string()
    .min(10, 'Cuéntanos tus dudas (mínimo 10 caracteres)')
    .max(2000, 'Descripción muy larga (máx. 2000 caracteres)'),
});

type CotizacionData = z.infer<typeof cotizacionSchema>;

const motivos = [
  'Arriendo de Cabañas',
  'Paseo por el día',
  'Uso de Piscinas / Spa',
  'Eventos y Celebraciones',
  'Otra consulta',
];

const pasajerosOptions = [
  { value: '1-2', label: '1 - 2 personas' },
  { value: '3-4', label: '3 - 4 personas' },
  { value: '5-6', label: '5 - 6 personas' },
  { value: '7-mas', label: '7 o más personas' },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full bg-concrete-800/60 rounded-xl border border-bronze-500/30 px-4 py-3.5 text-concrete-100 ' +
  'font-sans text-sm placeholder-concrete-500 focus:outline-none focus:border-bronze-500/80 ' +
  'transition-colors duration-300 autofill:bg-concrete-800';

const labelClass =
  'block font-sans text-xs uppercase tracking-[0.18em] text-concrete-400 mb-2';

const errorClass = 'mt-1.5 font-sans text-xs text-red-400';

export default function CotizacionForm() {
  const [status, setStatus] = useState<FormStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CotizacionData>({
    resolver: zodResolver(cotizacionSchema),
  });

  const descripcion = watch('descripcion', '');

  const onSubmit = async (data: CotizacionData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/quote', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Error en el servidor');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-6">
        <CheckCircle className="text-bronze-500" size={52} strokeWidth={1.2} />
        <div>
          <h3 className="font-serif text-3xl text-concrete-50 mb-3">
            Solicitud enviada
          </h3>
          <p className="font-sans text-sm text-concrete-400 max-w-sm leading-relaxed">
            Hemos recibido tus datos. Nuestro equipo se pondrá en contacto contigo
            a la brevedad para ayudarte con tu visita.
          </p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="btn-outline mt-2 text-xs"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

      {/* Row 1: Nombre + Teléfono */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nombre" className={labelClass}>
            Nombre completo <span className="text-bronze-500">*</span>
          </label>
          <input
            id="nombre"
            type="text"
            autoComplete="name"
            placeholder="Ej: Juan Pérez"
            className={inputClass}
            {...register('nombre')}
          />
          {errors.nombre && (
            <p className={errorClass}>{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className={labelClass}>
            Teléfono <span className="text-bronze-500">*</span>
          </label>
          <input
            id="telefono"
            type="tel"
            autoComplete="tel"
            placeholder="+56 9 XXXX XXXX"
            className={inputClass}
            {...register('telefono')}
          />
          {errors.telefono && (
            <p className={errorClass}>{errors.telefono.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Correo electrónico <span className="text-bronze-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="nombre@correo.cl"
          className={inputClass}
          {...register('email')}
        />
        {errors.email && (
          <p className={errorClass}>{errors.email.message}</p>
        )}
      </div>

      {/* Row 3: Motivo + Pasajeros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="motivo" className={labelClass}>
            Motivo de consulta <span className="text-bronze-500">*</span>
          </label>
          <div className="relative">
            <select
              id="motivo"
              className={`${inputClass} appearance-none cursor-pointer`}
              {...register('motivo')}
              defaultValue=""
            >
              <option value="" disabled className="bg-concrete-800 text-concrete-500">
                Selecciona un motivo
              </option>
              {motivos.map((m) => (
                <option key={m} value={m} className="bg-concrete-800 text-concrete-100">
                  {m}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2
                             text-bronze-500/60 text-xs">▼</span>
          </div>
          {errors.motivo && (
            <p className={errorClass}>{errors.motivo.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="pasajeros" className={labelClass}>
            Cantidad de personas <span className="text-bronze-500">*</span>
          </label>
          <div className="relative">
            <select
              id="pasajeros"
              className={`${inputClass} appearance-none cursor-pointer`}
              {...register('pasajeros')}
              defaultValue=""
            >
              <option value="" disabled className="bg-concrete-800 text-concrete-500">
                Selecciona una cantidad
              </option>
              {pasajerosOptions.map((p) => (
                <option key={p.value} value={p.value} className="bg-concrete-800 text-concrete-100">
                  {p.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2
                             text-bronze-500/60 text-xs">▼</span>
          </div>
          {errors.pasajeros && (
            <p className={errorClass}>{errors.pasajeros.message}</p>
          )}
        </div>
      </div>

      {/* Row 4: Descripción */}
      <div>
        <label htmlFor="descripcion" className={labelClass}>
          Detalles o consultas adicionales <span className="text-bronze-500">*</span>
        </label>
        <textarea
          id="descripcion"
          rows={5}
          placeholder="Cuéntanos las fechas estimadas de tu viaje, si vienes con niños o si tienes alguna consulta especial sobre las cabañas, piscinas o el entorno..."
          className={`${inputClass} resize-none`}
          {...register('descripcion')}
        />
        <div className="flex items-center justify-between mt-1.5">
          {errors.descripcion ? (
            <p className={errorClass}>{errors.descripcion.message}</p>
          ) : (
            <span />
          )}
          <span className={`font-sans text-xs ml-auto ${
            descripcion.length > 1800 ? 'text-red-400' : 'text-concrete-600'
          }`}>
            {descripcion.length}/2000
          </span>
        </div>
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <div className="flex items-center gap-3 border border-red-500/30 bg-red-500/5 px-4 py-3">
          <AlertCircle size={16} className="text-red-400 shrink-0" />
          <p className="font-sans text-sm text-red-300">
            Ocurrió un error al enviar. Por favor intenta nuevamente o escríbenos por WhatsApp.
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center gap-3 disabled:opacity-60
                   disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Enviando solicitud…
          </>
        ) : (
          <>
            <Send size={15} />
            Enviar Solicitud
          </>
        )}
      </button>

      <p className="font-sans text-xs text-concrete-600 text-center leading-relaxed">
        Al enviar este formulario aceptas que nos pongamos en contacto contigo.<br />
        No compartimos tu información con terceros.
      </p>

    </form>
  );
}
