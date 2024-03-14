export interface ProcessContactFeatureDto {
  readonly pageFeatureId: string;
  readonly name?: string;
  readonly emailAddress?: string;
  readonly message?: string;
  readonly country?: string;
  readonly phone?: {
    readonly number: string;
    readonly country: string;
  };
}
