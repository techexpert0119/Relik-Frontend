export interface IBadRequestException {
  statusCode: number;
  message: string;
  errors: { property: string; message: string }[];
}
