import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'valid' | 'already' | 'invalid' | 'success' | 'error'>('loading');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus('invalid');
      return;
    }

    const validate = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const res = await fetch(
          `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`,
          { headers: { apikey: supabaseKey } }
        );
        const data = await res.json();
        if (data.valid === true) setStatus('valid');
        else if (data.reason === 'already_unsubscribed') setStatus('already');
        else setStatus('invalid');
      } catch {
        setStatus('invalid');
      }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('handle-email-unsubscribe', {
        body: { token },
      });
      if (error) throw error;
      const result = typeof data === 'string' ? JSON.parse(data) : data;
      if (result.success) setStatus('success');
      else if (result.reason === 'already_unsubscribed') setStatus('already');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
    setProcessing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg px-4 relative overflow-hidden">
      <div className="absolute inset-0 system-grid opacity-40 pointer-events-none" />
      <div className="relative max-w-md w-full text-center space-y-6 p-8 rounded-2xl glass">
        <div className="eyebrow justify-center inline-flex mx-auto">
          <span>EMAIL // PREFERÊNCIAS</span>
        </div>
        {status === 'loading' && (
          <p className="text-muted-foreground font-mono text-sm">Verificando...</p>
        )}
        {status === 'valid' && (
          <>
            <h1 className="display-m">Cancelar inscrição</h1>
            <p className="text-muted-foreground text-sm">
              Tem certeza que deseja parar de receber emails?
            </p>
            <button
              onClick={handleUnsubscribe}
              disabled={processing}
              className="command-button w-full justify-center disabled:opacity-50"
            >
              {processing ? 'Processando...' : 'Confirmar cancelamento'}
            </button>
          </>
        )}
        {status === 'success' && (
          <>
            <h1 className="display-m text-aurora">Inscrição cancelada</h1>
            <p className="text-muted-foreground text-sm">Você não receberá mais emails.</p>
          </>
        )}
        {status === 'already' && (
          <>
            <h1 className="display-m">Já cancelado</h1>
            <p className="text-muted-foreground text-sm">Sua inscrição já foi cancelada anteriormente.</p>
          </>
        )}
        {status === 'invalid' && (
          <>
            <h1 className="display-m text-destructive">Link inválido</h1>
            <p className="text-muted-foreground text-sm">Este link de cancelamento é inválido ou expirou.</p>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="display-m text-destructive">Erro</h1>
            <p className="text-muted-foreground text-sm">Ocorreu um erro. Tente novamente mais tarde.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UnsubscribePage;
