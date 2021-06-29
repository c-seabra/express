import React, { FunctionComponent, useState } from 'react';


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
    element: Element,
    context: SharedContext,
    forceUpdate: () => void,
  ) => Promise<Element>;
  process: (
    element: Element,
    context: SharedContext,
    forceUpdate: () => void,
  ) => Promise<Element>;
};

enum BulkOperationToolState {
  DEFINE_CONTEXT,
  UPLOAD_WORK_UNIT_LIST,
  PREPARE_WORK_UNITS,
  PROCESS_WORK_UNITS,
}

function BulkOperationTool<WorkUnit, SharedContext>({
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
      <>
        <RenderContextForm
          initialContext={sharedContext}
          setContext={setContext}
        />
      </>
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
      <>
        <RenderContextSummary context={sharedContext} />
        <button onClick={backToContext}>Edit Context</button>
        <RenderListForm setList={setList} />
      </>
    );
  }
}
