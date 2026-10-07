import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { CHART_RECALC_EVENT } from '../lib/chartRecalcEvents';
import './ChartRecalcNotice.css';

export default function ChartRecalcNotice() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const show = (event: Event) => setMessage((event as CustomEvent<string>).detail);
    window.addEventListener(CHART_RECALC_EVENT, show);
    return () => window.removeEventListener(CHART_RECALC_EVENT, show);
  }, []);

  if (!message) return null;

  return (
    <div className="chart-recalc-notice" role="status">
      <div className="chart-recalc-notice__body">
        <strong>Ton ciel, recalculé</strong>
        <p>{message}</p>
      </div>
      <button type="button" onClick={() => setMessage(null)} aria-label="Fermer">
        <X size={16} strokeWidth={1.7} aria-hidden="true" />
      </button>
    </div>
  );
}
