import { toast } from '@/components/ui/use-toast';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;

  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);

  textarea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      toast({
        title: 'Success',
        description: 'Text copied!',
        variant: 'success',
      });
      console.log('Text copied to clipboard:', text);
    } else {
      console.error('Unable to copy text to clipboard.');
    }
  } catch (error) {
    console.error('Error copying text to clipboard:', error);
  } finally {
    document.body.removeChild(textarea);
  }
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

const publicFileURL = import.meta.env.VITE_PUBLIC_FILE_URL;
export function getPublicFileURL(fileName: string) {
  const oldURL = 'https://relik-public-files.s3.eu-central-1.amazonaws.com/';

  if (fileName.startsWith(oldURL)) {
    return fileName.replace(oldURL, publicFileURL);
  }

  return `${publicFileURL}${fileName}`;
}

const publicImageURL = import.meta.env.VITE_PUBLIC_IMAGE_URL;
export function getPublicImageURL(fileName: string) {
  const oldURL = 'https://relik-public-files.s3.eu-central-1.amazonaws.com/';

  if (fileName.startsWith(oldURL)) {
    return fileName.replace(oldURL, publicImageURL);
  }

  return `${publicImageURL}${fileName}`;
}

const publicImageCountryURL = import.meta.env.VITE_PUBLIC_IMAGE_COUNTRY_URL;
export function getPublicImageCountryURL(fileName: string) {
  return `${publicImageCountryURL}${fileName}.svg`;
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
  }).format(number);
}

export function formatCompactNumber(number: number) {
  return Intl.NumberFormat('en', { notation: 'compact' }).format(number);
}
