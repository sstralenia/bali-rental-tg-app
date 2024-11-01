import { useCallback } from 'react';
import mixpanel from '../mixpanel';

export default function useAnalytics() {
  const identifyFn = useCallback((id: string) => {
    mixpanel.identify(id);
  }, []);

  const trackFn = useCallback((event: string, properties: Record<string, unknown> = {}) => {
    mixpanel.track(event, properties);
  }, []);

  return { identify: identifyFn, track: trackFn };
}
