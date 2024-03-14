import { FC } from 'react';
import { IFeature } from '@/data/dtos/feature';
import Container from '../Container';
import { useGetSrc } from '@/hooks/useGetSrc';

const VideoFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const src = useGetSrc(feature.values.videoValues?.videoIframe || '', '', []);

  return (
    <Container title={feature.values.videoValues?.title}>
      <div className="overflow-hidden">
        <iframe
          loading="lazy"
          className="w-full aspect-video"
          title={feature.values.videoValues?.title}
          allow={`accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;`}
          style={{ borderRadius: '8px' }}
          src={src}
        />
      </div>
    </Container>
  );
};

export default VideoFeature;
