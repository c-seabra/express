import { CommerceDeal } from '@websummit/graphql/src/@types/operations';

export type Status = {
  message: string;
  type: StatusType;
};

export type StatusType = 'QUEUED' | 'PENDING' | 'SUCCESS' | 'ERROR';

export type Template = CommerceDeal;

export type CreateDiscountWorkUnit = {
  code?: string;
  prepareStatus: Status;
  processStatus: Status;
  template: Template;
};

export function defaultStatus(): Status {
  return {
    message: 'Waiting for other operations to finish before this one starts',
    type: 'QUEUED',
  };
}
