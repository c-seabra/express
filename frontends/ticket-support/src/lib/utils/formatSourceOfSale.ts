import { switchCase } from '@websummit/tsutils/src/lib/utils/logic';

export const missingDataAbbr = 'N/A';

export const formatSourceOfSale = (source: string): string =>
  switchCase({
    TICKET_MACHINE: 'Ticket Machine',
    TITO: 'Tito',
  })(missingDataAbbr)(source) as string;
