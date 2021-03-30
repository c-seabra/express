import { EventQuery } from '@websummit/graphql/src/@types/operations';
import get from 'lodash.get';

// If any rules for required fields (backend-wise) change
// those field keys should be added here appropriately
const eventCompletionRequirements = {
  avenger: ['id', 'slug'],
  stores: ['slug', 'currency', 'country', 'legalEntity.phone'],
  'ticket-assignment': ['id'],
  'ticket-release-mgmt': ['id'],
};

type CompletionInfo = {
  missing: string[];
  ready: boolean;
};

const getConfigCompletion = (data?: EventQuery) => (
  rule: keyof typeof eventCompletionRequirements,
) => {
  if (data?.event) {
    const { event } = data;

    const configCompletion: CompletionInfo = {
      missing: [],
      ready: true,
    };

    eventCompletionRequirements[rule].forEach((field: string) => {
      if (!get(event, field)) {
        configCompletion.missing.push(field);
        configCompletion.ready = false;
      }
    });

    return configCompletion;
  }

  return {
    missing: Object.assign([], eventCompletionRequirements[rule]),
    ready: false,
  };
};

export const getServicesReadyForEvent = (data?: EventQuery) => {
  const configCompletionFor = getConfigCompletion(data);
  return {
    avenger: configCompletionFor('avenger'),
    stores: configCompletionFor('stores'),
    'ticket-assignment': configCompletionFor('ticket-assignment'),
    'ticket-release-mgmt': configCompletionFor('ticket-release-mgmt'),
  };
};
