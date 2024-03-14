import { useEffect, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import Dropzone, { Accept } from 'react-dropzone';
import { FileService } from '@/services/api/file-service';
import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';

interface IProps {
  disabled?: boolean;
  showPreview?: boolean;
  onDropAccepted?: (url?: string) => void;
  id?: string;
  file?: string | undefined;
  accept?: Accept;
}

const UploadFile = (props: IProps) => {
  const { disabled, onDropAccepted, showPreview, id } = props;
  const [dropEnter, setDropEnter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<string>();

  useEffect(() => {
    if (props?.file) {
      setFile(props?.file);
    }
  }, [props?.file]);

  return (
    <Dropzone
      disabled={props.disabled ?? isLoading}
      accept={props?.accept}
      onDragEnter={() => setDropEnter(true)}
      onDragLeave={() => setDropEnter(false)}
      onDrop={() => setDropEnter(false)}
      onDropAccepted={(files) => {
        if (files.length === 1) {
          const file = files[0];

          setIsLoading(true);

          FileService.uploadFile(file)
            .then((data) => {
              if (showPreview) {
                setFile(data.url);
              }
              onDropAccepted && onDropAccepted(data.url);
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
          <section
            {...getRootProps()}
            style={{ marginTop: 0 }}
            className={`bg-white p-4 border rounded-md text-sm flex flex-col items-center space-y-1 w-full
            ${dropEnter && 'border-2 border-gray-300'} ${disabled ? 'opacity-50' : 'cursor-pointer'}`}
          >
            <input {...getInputProps()} id={id} />

            <div className="bg-gray-50 p-1.5 rounded-full">
              <div className="bg-gray-100 p-1.5 rounded-full">
                <UploadCloud className="h-5 w-5 bg-gray-100" />
              </div>
            </div>

            {!isLoading && <p>{file ? 'Update a file' : 'Upload a file'}</p>}

            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              showPreview &&
              file && <p className="text-center text-gray-500">{file}</p>
            )}
          </section>
        </div>
      )}
    </Dropzone>
  );
};

export default UploadFile;
