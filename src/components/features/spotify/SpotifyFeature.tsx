import { FC } from 'react';
import { IFeature, IVideoLink } from '@/data/dtos/feature';
import Container from '../Container';
import { useGetSrc } from '@/hooks/useGetSrc';
import { useGetAttributes } from '@/hooks/useGetAttributes';

const SpotifyFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const src = useGetSrc(
    feature.values.spotifyValues?.embeddedOrIframeLink || '',
    'https://open.spotify.com/embed',
    ['https://open.spotify.com']
  );

  const { height, width } = useGetAttributes(
    feature.values.spotifyValues?.embeddedOrIframeLink || ''
  );

  return (
    <Container title={feature.values.spotifyValues?.title}>
      <div className="overflow-hidden">
        {feature.values.spotifyValues?.linkType === IVideoLink.EMBEDDED && (
          <iframe
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ borderRadius: '8px' }}
            width={`${feature.values.spotifyValues?.width}%`}
            height={feature.values.spotifyValues?.height}
            src={src}
          />
        )}

        {feature.values.spotifyValues?.linkType === IVideoLink.IFRAME && (
          <iframe
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ borderRadius: '8px' }}
            width={width ?? '100%'}
            height={height ?? 152}
            src={src}
          />
        )}
      </div>
    </Container>
  );
};

export default SpotifyFeature;
