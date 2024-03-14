import { useEffect } from 'react';

interface Props {
  readonly ref: React.RefObject<HTMLElement>;
  readonly handleClickOutside: () => void;
}

export function useOutsideAlerter(props: Props) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        props.ref.current &&
        !props.ref.current.contains(event.target as Node)
      ) {
        props.handleClickOutside();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props.ref]);
}
