import { FC, ReactNode, useContext, CSSProperties } from 'react';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import useBorderRadius from './hooks/useBorderRadius';
import useBoxShadow from './hooks/useBoxShadow';
import useBorderWidth from './hooks/useBorderWidth';

interface ContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly title?: string;
  readonly isPageThemeEnabled?: boolean;
  readonly style?: CSSProperties;
}

const Container: FC<ContainerProps> = ({
  children,
  className,
  title,
  isPageThemeEnabled,
  style,
}) => {
  const { page } = useContext(PageContext) ?? {};
  const borderRadius = useBorderRadius();
  const boxShadow = useBoxShadow();
  const borderWidth = useBorderWidth();

  return (
    <div className="px-[24px] font-[400] text-md w-full">
      {title && (
        <h2
          className="text-xl text-bold mb-3 truncate"
          style={{ color: page?.theme.fontColor }}
        >
          {title}
        </h2>
      )}

      <div
        style={{
          ...(isPageThemeEnabled
            ? {
                color: page?.theme.buttonFontColor,
                background: page?.theme.buttonBackground,
                borderStyle: 'solid',
                borderColor: page?.theme.buttonFontColor,
                boxShadow,
                borderRadius,
                borderWidth,
              }
            : {}),
          ...style,
        }}
        className={className}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
