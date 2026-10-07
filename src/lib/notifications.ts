import { Supabase, isSupabaseConfigured } from './supabase';
import { getSessionId } from './session';

// Morning push notification for the daily challenge (Web Push).
// The subscription is stored in Supabase; the Edge Function
// `daily-notification` sends the message at the user's local morning.

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;
const NOTIFY_HOUR = 8;

export type NotificationAvailability = 'ready' | 'needs-install' | 'unsupported' | 'not-configured';
export type NotificationState = 'on' | 'off' | 'denied';

const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

export const getNotificationAvailability = (): NotificationAvailability => {
  const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  // iOS only exposes Web Push to apps added to the home screen.
  if (isIos() && !isStandalone()) return 'needs-install';
  if (!supported) return 'unsupported';
  if (!VAPID_PUBLIC_KEY || !isSupabaseConfigured) return 'not-configured';
  return 'ready';
};

const urlBase64ToUint8Array = (base64: string) => {
  const padded = `${base64}${'='.repeat((4 - (base64.length % 4)) % 4)}`.replace(/-/g, '+').replace(/_/g, '/');
  const raw = window.atob(padded);
  return Uint8Array.from(raw, (char) => char.charCodeAt(0));
};

const currentSubscription = async () => {
  const registration = await navigator.serviceWorker.ready;
  return registration.pushManager.getSubscription();
};

export const getNotificationState = async (): Promise<NotificationState> => {
  if (Notification.permission === 'denied') return 'denied';
  const subscription = await currentSubscription();
  return subscription ? 'on' : 'off';
};

export const enableDailyNotification = async (): Promise<NotificationState> => {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return permission === 'denied' ? 'denied' : 'off';

  const registration = await navigator.serviceWorker.ready;
  const subscription =
    (await registration.pushManager.getSubscription()) ??
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY ?? ''),
    }));

  const { data: { user } } = await Supabase.auth.getUser();
  const { error } = await Supabase.from('push_subscriptions').upsert(
    {
      endpoint: subscription.endpoint,
      subscription: subscription.toJSON(),
      user_id: user?.id ?? null,
      session_id: user ? null : getSessionId(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Paris',
      notify_hour: NOTIFY_HOUR,
    },
    { onConflict: 'endpoint' },
  );
  if (error) {
    await subscription.unsubscribe();
    throw error;
  }
  return 'on';
};

export const disableDailyNotification = async (): Promise<NotificationState> => {
  const subscription = await currentSubscription();
  if (subscription) {
    await Supabase.from('push_subscriptions').delete().eq('endpoint', subscription.endpoint);
    await subscription.unsubscribe();
  }
  return 'off';
};
