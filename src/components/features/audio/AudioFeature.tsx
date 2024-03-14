import { FC, useEffect, useRef } from 'react';
import { IFeature } from '@/data/dtos/feature';
import Container from '../Container';
import { getPublicFileURL } from '@/lib/utils';

const AudioFeature: FC<{ feature: IFeature }> = ({ feature }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isImageAsBackground =
    feature.values.audioValues?.isImageAsBackground &&
    feature.values.audioValues?.photo;

  useEffect(() => {
    const element = audioRef.current as unknown as HTMLAudioElement;
    if (element) element.playbackRate = 1;
  }, [feature.values.audioValues?.file, audioRef]);

  return (
    <Container
      title={feature.values.audioValues?.title}
      isPageThemeEnabled={true}
      style={{
        borderRadius: '8px',
        ...(isImageAsBackground
          ? {
              color: 'white',
              background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${feature.values.audioValues?.photo})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
          : {
              color: '#020817',
              background: 'white',
            }),
      }}
    >
      <div className="grid gap-4 p-8 pb-4">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col mb-3">
            <p className="font-bold text-lg">
              {feature.values.audioValues?.audioTitle}
            </p>
            <p className="opacity-50">
              {feature.values.audioValues?.audioAuthor}
            </p>
          </div>
        </div>

        <audio ref={audioRef} preload="none" controls className="w-full">
          <source
            src={getPublicFileURL(feature.values.audioValues?.file ?? '')}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </Container>
  );
};

export default AudioFeature;
