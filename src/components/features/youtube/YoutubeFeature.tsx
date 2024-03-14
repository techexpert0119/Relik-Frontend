import { FC, useContext, useEffect, useState } from 'react';
import { IFeature, IVideoLink } from '@/data/dtos/feature';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';
import Container from '../Container';
import { Play } from 'lucide-react';
import { useGetSrc } from '@/hooks/useGetSrc';

const YoutubeFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const { page } = useContext(PageContext) ?? {};
  const [isImageClicked, setIsImageClicked] = useState(
    feature.values.youtubeValues?.photo ? false : true
  );

  useEffect(() => {
    setIsImageClicked(feature.values.youtubeValues?.photo ? false : true);
  }, [feature.values.youtubeValues?.photo]);

  const src = useGetSrc(
    feature.values.youtubeValues?.embeddedOrIframeLink || '',
    'https://www.youtube.com/embed',
    ['https://youtu.be', 'https://www.youtube.com']
  );

  return (
    <Container title={feature.values.youtubeValues?.title}>
      {isImageClicked ? (
        <>
          <div className="overflow-hidden">
            {feature.values.youtubeValues?.linkType === IVideoLink.EMBEDDED && (
              <iframe
                loading="lazy"
                width={feature.values.youtubeValues?.width}
                height={feature.values.youtubeValues?.height}
                title={feature.values.youtubeValues?.title}
                allow={`accelerometer; autoplay=${feature.values.youtubeValues.isAutoplay}; clipboard-write; encrypted-media; gyroscope; picture-in-picture;`}
                allowFullScreen={
                  feature.values.youtubeValues?.isAllowFullscreen
                }
                style={{ borderRadius: '8px' }}
                src={src}
              />
            )}

            {(feature.values.youtubeValues?.linkType === IVideoLink.IFRAME ||
              feature.values.youtubeValues?.linkType === IVideoLink.LINK) && (
              <iframe
                loading="lazy"
                className="w-full aspect-video"
                title={feature.values.youtubeValues?.title}
                allow={`accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;`}
                style={{ borderRadius: '8px' }}
                src={src}
              />
            )}
          </div>
        </>
      ) : (
        <div
          className="relative object-cover bg-no-repeat bg-cover w-full aspect-video"
          style={{
            borderRadius: '8px',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${feature.values.youtubeValues?.photo})`,
          }}
        >
          <Play
            onClick={() => setIsImageClicked(true)}
            style={{ color: page?.theme.background }}
            className="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-24 md:h-24 w-16 h-16"
          />
        </div>
      )}
    </Container>
  );
};

export default YoutubeFeature;
