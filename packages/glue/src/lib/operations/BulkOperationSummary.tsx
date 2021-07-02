import Badge from '@websummit/components/src/atoms/Badge';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import GroupedProgressBar from '@websummit/components/src/molecules/GroupedProgressBar';
import Legend from '@websummit/components/src/molecules/Legend';
import {
  Flex,
  FlexCentered,
  FlexEnd,
} from '@websummit/components/src/templates/Flex';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { StringLiteral } from '@websummit/tsutils/src/@types/string';
import _ from 'lodash';
import React from 'react';

type GenericStatus<StatusType> = {
  message: string;
  type: StringLiteral<StatusType>;
};

function createGroupedResults<StatusType>(list: GenericStatus<StatusType>[]) {
  return _.countBy(list, 'type');
}

type Stack = {
  color: string;
  label: string;
};

/**
 * This type defines a map of all your possible status strings
 * to a Stack, which is color and label of that status
 *
 * Its a utility type you can explicitly specify so typescript
 * can infer that everything is indeed correctly typed
 *
 * You use it to help the compiler out a bit :)
 *
 * @typeParam StatusType - an enum of all possible statuses
 * This is enforced to be string literals
 * It is technically a union type of string literals
 * ```ts
 * type MyStatusType = 'QUEUED' | 'PENDING' | 'SUCCESS' | 'ERROR';
 * ```
 */
export type StatusMapping<StatusType> = {
  [K in StringLiteral<StatusType>]: Stack;
};

type BulkOperationSummaryProps<StatusType> = {
  list: GenericStatus<StatusType>[];
  mapping: StatusMapping<StatusType>;
  order: StringLiteral<StatusType>[];
};

/**
 * This component renders a summary of a list of bulk operations
 *
 * It consists of a stacked progress bar and a textual summary with counts
 *
 * @typeParam StatusType - an enum of all possible statuses
 * This is enforced to be string literals
 * It is technically a union type of string literals
 * ```ts
 * type MyStatusType = 'QUEUED' | 'PENDING' | 'SUCCESS' | 'ERROR';
 * ```
 *
 * @param list - a list of just the relevant status of each work unit
 * @param mapping - a map of each possible status to its label and color
 * @param order - the order in which each status should appear, omit to hide
 */
function BulkOperationSummary<StatusType>({
  list,
  mapping,
  order,
}: BulkOperationSummaryProps<StatusType>) {
  const groupedResults = createGroupedResults(list);

  const stacks = order.map((elem) => ({
    ...mapping[elem],
    value: groupedResults[elem],
  }));

  const labels = stacks.map((elem) => ({
    ...elem,
    label: `${elem.label} (${elem.value || 0})`,
  }));

  return (
    <>
      <Spacing bottom="2rem">
        <ContainerCard title="Grouped results">
          <FlexEnd>
            <Spacing bottom="0.5rem">
              <span>Total: </span>
              <Badge background="#CCC" color="#000">
                <span>
                  {groupedResults[order[0]] || 0}/{list.length}
                </span>
              </Badge>
            </Spacing>
          </FlexEnd>
          <Spacing bottom="1rem">
            <Spacing bottom="1rem">
              <Flex>
                <GroupedProgressBar barStacks={stacks} />
              </Flex>
            </Spacing>
            <FlexCentered>
              <Legend labels={labels} position="Horizontal" />
            </FlexCentered>
          </Spacing>
        </ContainerCard>
      </Spacing>
    </>
  );
}

export default BulkOperationSummary;
