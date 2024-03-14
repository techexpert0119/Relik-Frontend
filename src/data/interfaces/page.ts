import { IFile } from '@/data/interfaces/file';
import { IPageTheme } from '@/data/interfaces/page-theme';
import { IPageVersionHistory } from './page-version-history';

export interface IPage {
  _id: string;
  pageName: string;
  pageLink: string;
  pageDescription: string;
  status: PageStatus;
  isPublic: boolean;
  pageProfilePhoto?: IFile;
  pageCoverPhoto?: IFile;
  theme: IPageTheme;
  statistics: {
    see: number;
    budget: number;
  };
  lastTimePagePublishedAt: string;
  updatedAt: Date;
  undoHistoryLength: number;
  redoHistoryLength: number;
  undoCountWhenThePageIsLastPublished: number;
  latestRestoredVersion?: IPageVersionHistory;
}

export interface IPagePayload {
  pageName: string;
  pageDescription: string;
  pageLink: string;
  pageProfilePhoto: string;
}
export enum PageStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}
