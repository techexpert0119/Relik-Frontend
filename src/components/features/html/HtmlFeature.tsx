import { FC } from 'react';
import { IFeature } from '@/data/dtos/feature';
import Container from '../Container';

const HtmlFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  return (
    <Container title={feature.values.htmlValues?.title}>
      <div
        className="w-full flex flex-col items-center overflow-hidden"
        dangerouslySetInnerHTML={{
          __html: feature.values.htmlValues?.html ?? '',
        }}
      />
    </Container>
  );
};

export default HtmlFeature;
