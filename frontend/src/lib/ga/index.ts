// log the pageview with their URL
export const pageview = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }: { action: any; params: any }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.gtag("event", action, params);
};
