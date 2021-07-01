import { CommerceDeal } from '@websummit/graphql/src/@types/operations';

import { CreateDiscountWorkUnit, defaultStatus, Template } from './workUnit';

export type WorkUnitContext = {
  template: Template;
};

export function transformTemplateIntoWorkUnit(
  template: CommerceDeal,
): CreateDiscountWorkUnit {
  return {
    status: defaultStatus(),
    template,
  };
}
