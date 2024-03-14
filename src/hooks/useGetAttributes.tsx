import { useMemo } from 'react';

export function useGetAttributes(iframeText: string): {
  height: string | undefined;
  width: string | undefined;
} {
  return useMemo(() => {
    if (iframeText.includes('<iframe ')) {
      const parser = new DOMParser();

      const doc = parser.parseFromString(iframeText, 'text/html');

      const iframeElement = doc.querySelector('iframe');

      if (iframeElement) {
        const heightAttribute = iframeElement.getAttribute('height');
        const widthAttribute = iframeElement.getAttribute('width');

        return {
          height: heightAttribute ?? undefined,
          width: widthAttribute ?? undefined,
        };
      }
    }

    return { height: undefined, width: undefined };
  }, [iframeText]);
}
