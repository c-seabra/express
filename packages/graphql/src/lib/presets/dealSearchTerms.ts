import {
  CommerceSearchTerm,
  CommerceSearchTermOp,
} from '../../@types/operations';

export const templateFilter: CommerceSearchTerm = {
  field: 'metadata.template',
  op: CommerceSearchTermOp.Eq,
  value: true,
};

export const discountsFilter: CommerceSearchTerm = {
  field: 'metadata.discount',
  op: CommerceSearchTermOp.Eq,
  value: true,
};

export const noTemplateFilter: CommerceSearchTerm = {
  field: 'metadata.template',
  op: CommerceSearchTermOp.Eq,
  value: null,
};

export const noDiscountsFilter: CommerceSearchTerm = {
  field: 'metadata.discount',
  op: CommerceSearchTermOp.Eq,
  value: null,
};

export const discountTemplateFilter: CommerceSearchTerm[] = [
  templateFilter,
  discountsFilter,
];

export const discountFilter: CommerceSearchTerm[] = [
  noTemplateFilter,
  discountsFilter,
];

export const dealsFilter: CommerceSearchTerm[] = [
  noTemplateFilter,
  noDiscountsFilter,
];
