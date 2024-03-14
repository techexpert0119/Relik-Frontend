import { LogoShape } from '@/data/enums/page-theme/logo-shape';
import { ButtonRadiusVariant } from '@/data/enums/page-theme/button-radius-variant';
import { ButtonBorderVariant } from '@/data/enums/page-theme/button-border-variant';
import { ButtonShadowVariant } from '@/data/enums/page-theme/button-shadow-variant';
import { ThemeFontFamily } from '@/app/pages/edit-page/components/theme-settings/enums/theme-font-family.enum';

export const defaultTheme = {
  logoShape: LogoShape.Hidden,
  fontFamily: ThemeFontFamily.Jost,
  fontColor: '#3D2D41',
  logoColor: '#DEA341',
  background: '#FFF2DE',
  buttonRadius: ButtonRadiusVariant.Rounded,
  buttonBorder: ButtonBorderVariant.None,
  buttonShadow: ButtonShadowVariant.None,
  buttonFontColor: '#000',
  buttonBackground: '#fff',
};
