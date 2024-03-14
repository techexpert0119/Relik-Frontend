import * as z from 'zod';
import { IPageTheme } from '@/data/interfaces/page-theme';
import { LogoShape } from '@/data/enums/page-theme/logo-shape';
import { ThemeFontFamily } from '@/app/pages/edit-page/components/theme-settings/enums/theme-font-family.enum';
import { ButtonRadiusVariant } from '@/data/enums/page-theme/button-radius-variant';
import { ButtonBorderVariant } from '@/data/enums/page-theme/button-border-variant';
import { ButtonShadowVariant } from '@/data/enums/page-theme/button-shadow-variant';
import { HeaderLayoutType } from '@/data/enums/header-layout-type';

export const themeSettingsSchema: z.ZodType<IPageTheme> = z.object({
  logoShape: z.nativeEnum(LogoShape),
  fontFamily: z.nativeEnum(ThemeFontFamily),
  fontColor: z.string(),
  logoColor: z.string(),
  background: z.string(),
  buttonRadius: z.nativeEnum(ButtonRadiusVariant),
  buttonBorder: z.nativeEnum(ButtonBorderVariant),
  buttonShadow: z.nativeEnum(ButtonShadowVariant),
  buttonFontColor: z.string(),
  buttonBackground: z.string(),
  headerLayoutType: z.nativeEnum(HeaderLayoutType),
});
