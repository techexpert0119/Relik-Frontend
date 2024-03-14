import { FeatureFormValues } from '@/data/dtos/feature';
import { PageFeatureType } from '@/data/enums/page-features';
import { useMemo } from 'react';
import * as z from 'zod';

const defaultSchema = z.object({});
export const useDefaultValueAndSchemaBuilder = (
  componentType: PageFeatureType
) => {
  const linkSchema = z.object({
    link: z.string().trim().min(1, { message: 'Required field' }),
    title: z.string().trim().min(1, { message: 'Required field' }),
    photo: z.string(),
  });
  const headerSchema = z.object({
    header: z.string().trim().min(1, { message: 'Required field' }),
  });
  const linkDefaultValue = {
    link: '',
    photo: '',
    title: '',
  };
  const headerDefaultValue = {
    header: '',
  };

  const schemaBuilder = useMemo(() => {
    switch (componentType) {
      case PageFeatureType.LINK:
        return linkSchema;
      case PageFeatureType.HEADER:
        return headerSchema;
      default:
        defaultSchema;
    }
  }, [componentType]);
  const defoultValueBuilder: FeatureFormValues = useMemo(() => {
    switch (componentType) {
      case PageFeatureType.LINK:
        return linkDefaultValue;
      case PageFeatureType.HEADER:
        return headerDefaultValue;
      default:
        return {};
    }
  }, [componentType]);

  return { schemaBuilder, defaultValueBuilder: defoultValueBuilder };
};
