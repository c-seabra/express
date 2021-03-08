import { switchCase } from './logic';

export const missingDataAbbr = 'N/A';

export const formatSourceOfSale = (source: string): string =>
  switchCase({
    TICKET_MACHINE: 'Ticket Machine',
    TITO: 'Tito',
  })(missingDataAbbr)(source) as string;
