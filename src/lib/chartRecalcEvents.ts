export const CHART_RECALC_EVENT = 'nightstar:chart-recalculated';

/** Annonce qu'un thème enregistré a été recalculé (affiché par <ChartRecalcNotice />). */
export function announceChartRecalculation(message: string) {
  window.dispatchEvent(new CustomEvent<string>(CHART_RECALC_EVENT, { detail: message }));
}
