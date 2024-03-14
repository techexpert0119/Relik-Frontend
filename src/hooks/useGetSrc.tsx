import { useMemo } from 'react';

export function useGetSrc(
  url: string,
  embeddedUrl: string,
  possibleUrls: Array<string>
): string | undefined {
  return useMemo(() => {
    if (url.includes('<iframe ')) {
      const parser = new DOMParser();

      const doc = parser.parseFromString(url, 'text/html');

      const iframeElement = doc.querySelector('iframe');

      if (iframeElement) {
        const srcAttribute = iframeElement.getAttribute('src');
        return srcAttribute ?? url;
      }

      return undefined;
    }

    if (url.includes(embeddedUrl)) {
      return url;
    }

    for (const possibleUrl of possibleUrls) {
      if (url.includes(possibleUrl)) {
        return url.replace(possibleUrl, embeddedUrl);
      }
    }

    return undefined;
  }, [url, embeddedUrl, possibleUrls]);
}
