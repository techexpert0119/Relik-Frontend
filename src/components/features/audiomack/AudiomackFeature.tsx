import { FC } from 'react';
import { IFeature } from '@/data/dtos/feature';
import Container from '../Container';

const AudiomackFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  return (
    <Container title={feature.values.audiomackValues?.title}>
      <div
        className="w-full overflow-hidden"
        dangerouslySetInnerHTML={{
          __html: feature.values.audiomackValues?.iframe ?? '',
        }}
      />
    </Container>
  );
};

export default AudiomackFeature;
