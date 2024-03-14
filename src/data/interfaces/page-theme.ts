import { LogoShape } from '@/data/enums/page-theme/logo-shape';
import { ButtonBorderVariant } from '@/data/enums/page-theme/button-border-variant';
import { ButtonShadowVariant } from '@/data/enums/page-theme/button-shadow-variant';
import { ButtonRadiusVariant } from '@/data/enums/page-theme/button-radius-variant';
import { HeaderLayoutType } from '@/data/enums/header-layout-type';

export interface IPageTheme {
  logoShape: LogoShape;
  fontFamily: string;
  fontColor: string;
  logoColor: string;
  background: string;
  buttonRadius: ButtonRadiusVariant;
  buttonBorder: ButtonBorderVariant;
  buttonShadow: ButtonShadowVariant;
  buttonFontColor: string;
  buttonBackground: string;
  headerLayoutType: HeaderLayoutType;
}
