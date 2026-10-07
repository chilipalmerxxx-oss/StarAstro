// Sends the morning "défi du jour" push notification.
//
// Meant to be called every hour (pg_cron + pg_net, see README.md next to this
// file). Each subscription is notified once per local day, from its
// `notify_hour` onwards in its own timezone.
//
// Secrets: VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT, CRON_SECRET
// (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase).

import { createClient } from 'npm:@supabase/supabase-js@2';
import webpush from 'npm:web-push@3.6.7';
import * as Astronomy from 'npm:astronomy-engine@2';

const SIGNS = [
  'Bélier', 'Taureau', 'Gémeaux', 'Cancer', 'Lion', 'Vierge',
  'Balance', 'Scorpion', 'Sagittaire', 'Capricorne', 'Verseau', 'Poissons',
];

const moonSign = (date: Date) => {
  const longitude = Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body.Moon, date, false)).elon;
  return SIGNS[Math.floor((((longitude % 360) + 360) % 360) / 30)];
};

const localParts = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  return { day: `${get('year')}-${get('month')}-${get('day')}`, hour: Number(get('hour')) };
};

Deno.serve(async (request) => {
  // Sans secret configuré, l'en-tête attendu serait "Bearer undefined" : n'importe qui pourrait déclencher l'envoi.
  const cronSecret = Deno.env.get('CRON_SECRET');
  if (!cronSecret || request.headers.get('Authorization') !== `Bearer ${cronSecret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  webpush.setVapidDetails(
    Deno.env.get('VAPID_SUBJECT') ?? 'mailto:contact@example.com',
    Deno.env.get('VAPID_PUBLIC_KEY') ?? '',
    Deno.env.get('VAPID_PRIVATE_KEY') ?? '',
  );

  const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
  const { data: subscriptions, error } = await supabase
    .from('push_subscriptions')
    .select('id, subscription, timezone, notify_hour, last_sent_on');
  if (error) return new Response(error.message, { status: 500 });

  const now = new Date();
  const sign = moonSign(now);
  let sent = 0;

  for (const row of subscriptions ?? []) {
    let local;
    try {
      local = localParts(now, row.timezone);
    } catch {
      local = localParts(now, 'Europe/Paris');
    }
    if (local.hour < row.notify_hour || row.last_sent_on === local.day) continue;

    const payload = JSON.stringify({
      title: 'Ton défi du jour t’attend',
      body: `La Lune est en ${sign} aujourd’hui. Ton défi et ton Oui / Non sont prêts.`,
      url: '/?from=notification',
    });

    try {
      await webpush.sendNotification(row.subscription, payload, { TTL: 6 * 60 * 60 });
      await supabase.from('push_subscriptions').update({ last_sent_on: local.day }).eq('id', row.id);
      sent++;
    } catch (pushError) {
      const status = (pushError as { statusCode?: number }).statusCode;
      if (status === 404 || status === 410) {
        await supabase.from('push_subscriptions').delete().eq('id', row.id);
      }
    }
  }

  return Response.json({ sent });
});
