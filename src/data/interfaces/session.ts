export interface ISession {
  _id: string;
  ip: string;
  lastAccessTime: string;
  userAgent?: string;
}

export interface ISessionDto extends ISession {
  thisDevice: boolean;
}
