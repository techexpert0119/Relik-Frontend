import { useContext, useRef } from 'react';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { ButtonShadowVariant } from '@/data/enums/page-theme/button-shadow-variant';

export default function useBoxShadow() {
  const { page } = useContext(PageContext) ?? {};
  const boxShadow = useRef('');

  switch (page?.theme.buttonShadow) {
    case ButtonShadowVariant.Hard:
      boxShadow.current = '#000 8px 8px';
      break;
    case ButtonShadowVariant.Soft:
      boxShadow.current = '0px 2px 11px 0px rgba(0, 0, 0, 0.125)';
      break;
    case ButtonShadowVariant.None:
      boxShadow.current = '';
      break;
  }

  return boxShadow.current;
}
