import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import Dropzone from 'react-dropzone';
import { FileService } from '@/services/api/file-service';
import { getPublicImageURL } from '@/lib/utils';

interface IProps {
  showPreview?: boolean;
  onDropAccepted?: (url?: string) => void;
  id?: string;
  position?: 'inside-full' | 'left';
}

const UploadImage = (props: IProps) => {
  const [disabled, setDisabled] = useState(false);
  const { onDropAccepted, showPreview, id, position } = props;
  const [dropEnter, setDropEnter] = useState(false);
  const [image, setImage] = useState<string>();

  return (
    <Dropzone
      disabled={disabled}
      accept={{ 'image/*': ['.jpg', '.svg', '.png', '.gif'] }}
      onDragEnter={() => setDropEnter(true)}
      onDragLeave={() => setDropEnter(false)}
      onDrop={() => setDropEnter(false)}
      onDropAccepted={(files) => {
        if (files.length === 1) {
          setDisabled(true);
          const file = files[0];
          FileService.uploadImage(file)
            .then((data) => {
              setDisabled(false);
              if (showPreview && data) {
                setImage(data.url);
              }
              onDropAccepted && onDropAccepted(data._id);
            })
            .catch(() => {
              setDisabled(false);
            });
        }
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div className="flex space-x-4 w-full">
          {showPreview && image && position === 'left' && (
            <img
              src={getPublicImageURL(image)}
              alt="preview"
              className="flex rounded-full h-16 w-16 object-cover"
            />
          )}

          <section
            {...getRootProps()}
            style={{ marginTop: 0 }}
            className={`bg-white  border rounded-md text-sm flex flex-col items-center  w-[240px] h-[240px]
            ${dropEnter && 'border-2 border-gray-300'} ${
              disabled ? 'opacity-50' : 'cursor-pointer'
            }`}
          >
            <input {...getInputProps()} id={id} />
            {showPreview && image && position === 'inside-full' ? (
              <img
                src={getPublicImageURL(image)}
                alt="preview"
                className="flex object-cover rounded-md p-0 m-0 w-full h-full"
              />
            ) : (
              <div className="flex justify-center  flex-col items-center h-full w-full p-4 text-center text-[12px]">
                <div className="bg-gray-50 p-1.5 rounded-full">
                  <div className="bg-gray-100 p-1.5 rounded-full">
                    <UploadCloud className="h-5 w-5 bg-gray-100" />
                  </div>
                </div>
                <p>
                  <b>Click to upload</b>{' '}
                  <span className="text-gray-400"> or drag and drop</span>
                </p>
                <p className=" text-gray-400 ">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            )}
          </section>
        </div>
      )}
    </Dropzone>
  );
};

export default UploadImage;
