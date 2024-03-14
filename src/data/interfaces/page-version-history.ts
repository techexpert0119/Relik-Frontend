export interface IPageVersionHistory {
  _id: string;
  pageId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  title?: string;
  description?: string;
}
