import mixpanel from 'mixpanel-browser';

mixpanel.init('8c173e44bf7c07c0439f383ae92b2a7f', {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

export default {
  identify: (id: string) => mixpanel.identify(id),
  track: (event: string, properties: Record<string, unknown>) => mixpanel.track(event, properties),
}