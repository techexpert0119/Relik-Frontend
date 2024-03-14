import React, { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return <div className="px-[16px] md:px-[111px]">{children}</div>;
}
