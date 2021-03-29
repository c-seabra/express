import { EventQuery } from '@websummit/graphql/src/@types/operations';

// If any rules for required fields (backend-wise) change
// those field keys should be added here appropriately
const eventCompletionRequirements = {
  avenger: ['id', 'slug'] as const,
  stores: ['slug', 'legalEntity'] as const,
  'ticket-assignment': ['id'] as const,
  'ticket-release-mgmt': ['id'] as const,
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
    eventCompletionRequirements[rule].forEach(
      (requiredField: keyof typeof event) => {
        if (!event[requiredField]) {
          configCompletion.missing.push(requiredField);
          configCompletion.ready = false;
        }
      },
    );

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
