import { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import Dropzone from 'react-dropzone';
import { FileService } from '@/services/api/file-service';
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { getPublicImageURL } from '@/lib/utils';

interface IProps {
  disabled?: boolean;
  id?: string;
  value?: string | undefined;
  setValue?: (value: string | undefined) => void;
  defaultImageUrl?: string;
}

const ImageUploadField = (props: IProps) => {
  const { disabled, setValue, id, value } = props;
  const [dropEnter, setDropEnter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dropzone
      disabled={props.disabled || isLoading}
      accept={{ 'image/*': ['.jpg', '.svg', '.png', '.gif'] }}
      onDragEnter={() => setDropEnter(true)}
      onDragLeave={() => setDropEnter(false)}
      onDrop={() => setDropEnter(false)}
      onDropAccepted={(files) => {
        if (files.length === 1) {
          const file = files[0];

          setIsLoading(true);
          FileService.uploadImage(file)
            .then((data) => {
              setValue?.(data.url);
            })
            .catch((e: AxiosError<{ message: string }>) =>
              toast({
                variant: 'destructive',
                title: 'Error',
                description: e.response?.data?.message,
              })
            )
            .finally(() => setIsLoading(false));
        }
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div className="flex space-x-4 w-full">
          {value ? (
            <div className="flex flex-col gap-2 relative">
              <img
                src={getPublicImageURL(value)}
                alt="preview"
                className="flex rounded-md h-24 w-24 object-cover border border-gray-300"
              />
              <button
                type="button"
                className="text-white absolute right-[-8px] top-[-8px] p-1 bg-red-700 rounded-full"
                onClick={() => setValue?.(undefined)}
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <section
              {...getRootProps()}
              style={{ marginTop: 0 }}
              className={`bg-white p-4 border rounded-md text-sm flex flex-col items-center space-y-1 grow
            ${dropEnter && 'border-2 border-gray-300'} ${
              disabled ? 'opacity-50' : 'cursor-pointer'
            }`}
            >
              <input {...getInputProps()} id={id} />

              <div className="bg-gray-50 p-1.5 rounded-full">
                <div className="bg-gray-100 p-1.5 rounded-full">
                  <UploadCloud className="h-5 w-5 bg-gray-100" />
                </div>
              </div>
              <div className="text-center text-gray-500">
                <p>
                  <b className="text-gray-700">Click to upload</b> or drag and
                  drop
                </p>
                <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </section>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default ImageUploadField;
