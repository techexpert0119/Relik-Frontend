import { useContext } from 'react';
import { PageStatus } from '@/data/interfaces/page';
import { PageContext } from '@/app/pages/user-single-page/context/page-context';

interface Props {
  readonly unsavedFeatureCount: number;
  readonly isUnsavedChange: boolean;
  readonly isUnsavedUndoChangeExist: boolean;
}

export function RenderPageStatus(props: Props) {
  const pageContext = useContext(PageContext);

  if (!pageContext) {
    return null;
  }

  const { page } = pageContext;

  if (!page) {
    return null;
  }

  return page?.status === PageStatus.ACTIVE ? (
    props.unsavedFeatureCount > 0 ? (
      <div className="px-3 rounded text-white bg-[#F79009]">Unpublished</div>
    ) : props.isUnsavedChange ? (
      <div className="px-3 rounded text-white bg-[#F79009]">Unpublished</div>
    ) : props.isUnsavedUndoChangeExist ? (
      <div className="px-3 rounded text-white bg-[#F79009]">Unpublished</div>
    ) : (
      <div className="px-3 rounded text-white bg-[#16CB06]">Published</div>
    )
  ) : (
    <div className="px-3 rounded text-white bg-[#F79009]">Unpublished</div>
  );
}
