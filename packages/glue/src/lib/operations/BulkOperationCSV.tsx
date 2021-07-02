import DownloadCSVButton from '@websummit/components/src/molecules/DownloadCSVButton';
import { FlexEnd } from '@websummit/components/src/templates/Flex';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { StringLiteral } from '@websummit/tsutils/src/@types/string';
import React from 'react';

type CSVType<T> = {
  [K in StringLiteral<T>]: string;
};

type BulkOperationCSVProps<WorkUnit, CSVRow> = {
  list: WorkUnit[];
  transformer: (elem: WorkUnit) => CSVType<CSVRow>;
};

/**
 * This component renders a download csv button
 *
 * @typeParam WorkUnit - The work unit type for this bulk operation
 * @typeParam CSVRow - the type for each csv row to ensure consistency
 *
 * @param list - the list of work units to include in the csv
 * @param transformer - a function that creates a single csv line
 */
function BulkOperationCSV<WorkUnit, CSVRow>({
  list,
  transformer,
}: BulkOperationCSVProps<WorkUnit, CSVRow>) {
  return (
    <>
      <Spacing bottom="2rem">
        {list && list.length > 0 && (
          <>
            <FlexEnd>
              <DownloadCSVButton
                buttonText="Download .csv file"
                data={list.map(transformer)}
              />
            </FlexEnd>
          </>
        )}
      </Spacing>
    </>
  );
}

export default BulkOperationCSV;
