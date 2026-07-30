import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle, Loader2, User, Phone, Mail, HelpCircle, Users, MessageSquare } from 'lucide-react';

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

// Estilo premium para inputs
const inputClass =
  'w-full bg-concrete-900/40 rounded-xl border border-bronze-500/20 pl-11 pr-4 py-3.5 text-concrete-50 ' +
  'font-sans text-sm placeholder-concrete-500/50 focus:outline-none focus:border-bronze-400/80 ' +
  'focus:bg-concrete-900/60 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] ' +
  'transition-all duration-300 autofill:bg-concrete-900';

const labelClass =
  'block font-sans text-[11px] uppercase tracking-[0.2em] text-concrete-400 mb-2 font-medium';

const errorClass = 'mt-1.5 font-sans text-xs text-red-400 flex items-center gap-1.5';

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
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-6 min-h-[400px]">
        <div className="relative">
          <div className="absolute inset-0 bg-bronze-500/20 blur-xl rounded-full"></div>
          <CheckCircle className="text-bronze-400 relative z-10" size={64} strokeWidth={1} />
        </div>
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
          className="btn-outline mt-4 text-xs"
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
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-bronze-500/40 group-focus-within:text-bronze-400 transition-colors pointer-events-none" size={18} />
            <input
              id="nombre"
              type="text"
              autoComplete="name"
              placeholder="Ej: Juan Pérez"
              className={inputClass}
              {...register('nombre')}
            />
          </div>
          {errors.nombre && (
            <p className={errorClass}><AlertCircle size={12} /> {errors.nombre.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className={labelClass}>
            Teléfono <span className="text-bronze-500">*</span>
          </label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-bronze-500/40 group-focus-within:text-bronze-400 transition-colors pointer-events-none" size={18} />
            <input
              id="telefono"
              type="tel"
              autoComplete="tel"
              placeholder="+56 9 XXXX XXXX"
              className={inputClass}
              {...register('telefono')}
            />
          </div>
          {errors.telefono && (
            <p className={errorClass}><AlertCircle size={12} /> {errors.telefono.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Correo electrónico <span className="text-bronze-500">*</span>
        </label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-bronze-500/40 group-focus-within:text-bronze-400 transition-colors pointer-events-none" size={18} />
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nombre@correo.cl"
            className={inputClass}
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p className={errorClass}><AlertCircle size={12} /> {errors.email.message}</p>
        )}
      </div>

      {/* Row 3: Motivo + Pasajeros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="motivo" className={labelClass}>
            Motivo de consulta <span className="text-bronze-500">*</span>
          </label>
          <div className="relative group">
            <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-bronze-500/40 group-focus-within:text-bronze-400 transition-colors pointer-events-none z-10" size={18} />
            <select
              id="motivo"
              className={`${inputClass} appearance-none cursor-pointer relative z-0`}
              {...register('motivo')}
              defaultValue=""
            >
              <option value="" disabled className="bg-concrete-900 text-concrete-500">
                Selecciona un motivo
              </option>
              {motivos.map((m) => (
                <option key={m} value={m} className="bg-concrete-900 text-concrete-100">
                  {m}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-bronze-500/60 text-xs z-10">▼</span>
          </div>
          {errors.motivo && (
            <p className={errorClass}><AlertCircle size={12} /> {errors.motivo.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="pasajeros" className={labelClass}>
            Cantidad de personas <span className="text-bronze-500">*</span>
          </label>
          <div className="relative group">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-bronze-500/40 group-focus-within:text-bronze-400 transition-colors pointer-events-none z-10" size={18} />
            <select
              id="pasajeros"
              className={`${inputClass} appearance-none cursor-pointer relative z-0`}
              {...register('pasajeros')}
              defaultValue=""
            >
              <option value="" disabled className="bg-concrete-900 text-concrete-500">
                Selecciona una cantidad
              </option>
              {pasajerosOptions.map((p) => (
                <option key={p.value} value={p.value} className="bg-concrete-900 text-concrete-100">
                  {p.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-bronze-500/60 text-xs z-10">▼</span>
          </div>
          {errors.pasajeros && (
            <p className={errorClass}><AlertCircle size={12} /> {errors.pasajeros.message}</p>
          )}
        </div>
      </div>

      {/* Row 4: Descripción */}
      <div>
        <label htmlFor="descripcion" className={labelClass}>
          Detalles o consultas adicionales <span className="text-bronze-500">*</span>
        </label>
        <div className="relative group">
          <MessageSquare className="absolute left-4 top-4 text-bronze-500/40 group-focus-within:text-bronze-400 transition-colors pointer-events-none" size={18} />
          <textarea
            id="descripcion"
            rows={5}
            placeholder="Ej: Fechas estimadas, si vienes con niños, consultas especiales..."
            className={`${inputClass} resize-none`}
            {...register('descripcion')}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          {errors.descripcion ? (
            <p className={errorClass}><AlertCircle size={12} /> {errors.descripcion.message}</p>
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
        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
          <AlertCircle size={18} className="text-red-400 shrink-0" />
          <p className="font-sans text-sm text-red-200">
            Ocurrió un error al enviar. Por favor intenta nuevamente o escríbenos por WhatsApp.
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 group relative overflow-hidden mt-4"
      >
        {/* Sweep effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
        
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin relative z-10" />
            <span className="relative z-10">Enviando solicitud…</span>
          </>
        ) : (
          <>
            <Send size={16} className="relative z-10 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            <span className="relative z-10 text-[13px]">Enviar Solicitud</span>
          </>
        )}
      </button>

      <p className="font-sans text-[11px] text-concrete-500 text-center leading-relaxed mt-4">
        Al enviar este formulario aceptas que nos pongamos en contacto contigo.<br />
        Tus datos están seguros y no los compartimos con terceros.
      </p>

    </form>
  );
}
