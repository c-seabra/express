import React, { FunctionComponent, useState } from 'react';

import BulkOperation from './BulkOperation';
import { BulkOperationContainer } from './BulkOperationContainer';

export type BulkOperationToolConfiguration<WorkUnit, SharedContext> = {
  RenderContextForm: FunctionComponent<{
    initialContext: SharedContext | undefined;
    setContext: (context: SharedContext) => void;
  }>;
  RenderContextSummary: FunctionComponent<{
    context: SharedContext;
  }>;
  RenderList: FunctionComponent<{ list: WorkUnit[] }>;
  RenderListForm: FunctionComponent<{
    setList: (list: WorkUnit[]) => void;
  }>;
  RenderPrepareSummary: FunctionComponent<{ list: WorkUnit[] }>;
  RenderProcessSummary: FunctionComponent<{ list: WorkUnit[] }>;
  prepare: (
    element: WorkUnit,
    context: SharedContext,
    forceUpdate: () => void,
  ) => Promise<WorkUnit>;
  process: (
    element: WorkUnit,
    context: SharedContext,
    forceUpdate: () => void,
  ) => Promise<WorkUnit>;
};

export const dummyRender = () => <></>;
export const dummyProcess: () => Promise<any> = () =>
  new Promise(() => undefined);

enum BulkOperationToolState {
  DEFINE_CONTEXT,
  UPLOAD_WORK_UNIT_LIST,
  PREPARE_WORK_UNITS,
  PROCESS_WORK_UNITS,
}

export function BulkOperationTool<WorkUnit, SharedContext>({
  RenderList,
  RenderPrepareSummary,
  RenderProcessSummary,
  RenderContextForm,
  RenderContextSummary,
  RenderListForm,
  prepare,
  process,
}: BulkOperationToolConfiguration<WorkUnit, SharedContext>) {
  const [toolState, setToolState] = useState<BulkOperationToolState>(
    BulkOperationToolState.DEFINE_CONTEXT,
  );

  const [sharedContext, setSharedContext] = useState<SharedContext | undefined>(
    undefined,
  );
  const [workUnitList, setWorkUnitList] = useState<WorkUnit[] | undefined>(
    undefined,
  );

  const [prepared, setPrepared] = useState<boolean>(false);
  const [processed, setProcessed] = useState<boolean>(false);

  const resetEverything = () => {
    setSharedContext(undefined);
    setWorkUnitList(undefined);
    setPrepared(false);
    setProcessed(false);
    setToolState(BulkOperationToolState.DEFINE_CONTEXT);
  };

  if (
    toolState === BulkOperationToolState.DEFINE_CONTEXT ||
    sharedContext === undefined
  ) {
    const setContext = (context: SharedContext) => {
      setToolState(BulkOperationToolState.UPLOAD_WORK_UNIT_LIST);
      setSharedContext(context);
    };
    // todo: render some surrounding stuff for context
    return (
      <BulkOperationContainer resetEverything={resetEverything}>
        <RenderContextForm
          initialContext={sharedContext}
          setContext={setContext}
        />
      </BulkOperationContainer>
    );
  }

  if (
    toolState === BulkOperationToolState.UPLOAD_WORK_UNIT_LIST ||
    workUnitList === undefined
  ) {
    const setList = (list: WorkUnit[]) => {
      setToolState(BulkOperationToolState.PREPARE_WORK_UNITS);
      setWorkUnitList(list);
    };
    const backToContext = () =>
      setToolState(BulkOperationToolState.DEFINE_CONTEXT);
    return (
      <BulkOperationContainer resetEverything={resetEverything}>
        <RenderContextSummary context={sharedContext} />
        <button type="button" onClick={backToContext}>
          Edit Context
        </button>
        <RenderListForm setList={setList} />
      </BulkOperationContainer>
    );
  }

  if (toolState === BulkOperationToolState.PREPARE_WORK_UNITS) {
    const RenderPrepareDisplay: FunctionComponent<{ list: WorkUnit[] }> = ({
      list,
    }) => (
      <BulkOperationContainer resetEverything={resetEverything}>
        <RenderPrepareSummary list={list} />
        <RenderList list={list} />
      </BulkOperationContainer>
    );

    const donePreparing = () => setPrepared(true);
    const proceedWithProcessing = () =>
      setToolState(BulkOperationToolState.PROCESS_WORK_UNITS);

    return (
      <BulkOperationContainer resetEverything={resetEverything}>
        <button
          disabled={!prepared}
          type="button"
          onClick={proceedWithProcessing}
        >
          Confirm pre-check and start operations
        </button>
        <BulkOperation
          Display={RenderPrepareDisplay}
          callback={donePreparing}
          context={sharedContext}
          input={workUnitList}
          process={prepare}
        />
      </BulkOperationContainer>
    );
  }

  if (toolState === BulkOperationToolState.PROCESS_WORK_UNITS) {
    const RenderProcessDisplay: FunctionComponent<{ list: WorkUnit[] }> = ({
      list,
    }) => (
      <BulkOperationContainer resetEverything={resetEverything}>
        <RenderProcessSummary list={list} />
        <RenderList list={list} />
      </BulkOperationContainer>
    );

    const doneProcessing = () => setProcessed(true);

    return (
      <BulkOperationContainer resetEverything={resetEverything}>
        <button disabled={!processed} type="button" onClick={resetEverything}>
          I have downloaded my results csv and want to do another batch, reset
          everything please
        </button>
        <BulkOperation
          Display={RenderProcessDisplay}
          callback={doneProcessing}
          context={sharedContext}
          input={workUnitList}
          process={process}
        />
      </BulkOperationContainer>
    );
  }

  return (
    <>
      <h1>The Bulk Operation Toolkit is in an invalid state: {toolState}</h1>
    </>
  );
}
