import { FC } from 'react';
import { IFeature } from '@/data/dtos/feature';
import Container from '../Container';
import { useGetSrc } from '@/hooks/useGetSrc';

const AppleMusicFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const src = useGetSrc(
    feature.values.appleMusicValues?.embeddedOrIframeLink || '',
    'https://embed.music.apple.com',
    ['https://music.apple.com']
  );

  return (
    <Container title={feature.values.appleMusicValues?.title}>
      <div className="overflow-hidden relative w-full">
        <iframe
          loading="lazy"
          className="w-full"
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          style={{ borderRadius: '8px' }}
          src={src}
        />
      </div>
    </Container>
  );
};

export default AppleMusicFeature;
