import { LinkType } from '../enums/link-type';

export interface ILinkValueDto {
  title: string;
  linkType: LinkType;
  url: string;
}
