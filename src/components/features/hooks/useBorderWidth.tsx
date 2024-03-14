import { useContext, useRef } from 'react';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import { ButtonBorderVariant } from '@/data/enums/page-theme/button-border-variant';

export default function useBorderWidth() {
  const { page } = useContext(PageContext) ?? {};
  const borderWidth = useRef('');

  switch (page?.theme.buttonBorder) {
    case ButtonBorderVariant.Thin:
      borderWidth.current = '1px';
      break;
    case ButtonBorderVariant.None:
      borderWidth.current = '';
      break;
  }

  return borderWidth.current;
}
