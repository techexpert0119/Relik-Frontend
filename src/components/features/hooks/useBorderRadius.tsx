import { useContext, useRef } from 'react';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { ButtonRadiusVariant } from '@/data/enums/page-theme/button-radius-variant';

export default function useBorderRadius() {
  const { page } = useContext(PageContext) ?? {};
  const borderRadius = useRef('');

  switch (page?.theme.buttonRadius) {
    case ButtonRadiusVariant.Full:
      borderRadius.current = '50px';
      break;
    case ButtonRadiusVariant.Rounded:
      borderRadius.current = '12px';
      break;
    case ButtonRadiusVariant.None:
      borderRadius.current = '0';
  }

  return borderRadius.current;
}
