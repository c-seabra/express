import React from 'react';

export type BulkOperationContainerProps = {
  children: React.ReactNode;
  resetEverything: () => void;
};

export function BulkOperationContainer({
  resetEverything,
  children,
}: BulkOperationContainerProps) {
  return (
    <>
      <h1>This is a Bulk Operation Tool :)</h1>
      <button type="button" onClick={resetEverything}>
        Reset everything, discarding all changes?
      </button>
      {children}
    </>
  );
}
