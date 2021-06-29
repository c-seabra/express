import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

export type BulkInput<Element> = Element[];

export type BulkOperationConfig<Element, Context> = {
  Display: FunctionComponent<{ list: Element[] }>;
  callback?: (list: Element[]) => void;
  context: Context;
  input: BulkInput<Element>;
  process: (
    element: Element,
    context: Context,
    forceUpdate: () => void,
  ) => Promise<Element>;
};

type WorkingMemory<Element> = {
  completed: boolean;
  forceUpdate: () => void;
  list: Element[];
  started: boolean;
  updated: boolean;
};

async function doSomeBulkOperationWork<Element, Context>(
  workingMemory: React.MutableRefObject<WorkingMemory<Element>>,
  process: (
    element: Element,
    context: Context,
    forceUpdate: () => void,
  ) => Promise<Element>,
  context: Context,
) {
  type WorkUnit = {
    completed: boolean;
    index: number;
    work: Element;
  };

  async function wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  let counter = 0;
  const MAX_CONCURRENT_CONNECTIONS = 10;

  async function enqueueProcessing(element: Element, index: number) {
    // this seems weird but works because js is single threaded async
    // this is a polling multi-lock that keeps waiting promises as pending
    while (counter >= MAX_CONCURRENT_CONNECTIONS) {
      // eslint-disable-next-line no-await-in-loop
      await wait(100);
    }
    // at this point we have acquired a spot in our lock
    counter += 1;

    // now we can actually start the work with its side effects
    try {
      // since our work has completed, we need to write the result back
      // eslint-disable-next-line no-param-reassign
      workingMemory.current.list[index] = await process(
        element,
        context,
        workingMemory.current.forceUpdate,
      );
      // now we need to let react know that it should update
      // this only works since js is single threaded
      workingMemory.current.forceUpdate();
    } catch (e) {
      try {
        console.error(
          `There was an error processing element ${index} which was: ${JSON.stringify(
            element,
          )}`,
        );
      } catch (err) {
        console.error(
          `There was an error processing element ${index} which was: ${element}`,
        );
        console.error(err);
      }
      console.error(e);
    }

    // we need to release the lock after we are done
    // this code would deadlock if there is a possibility for
    // any errors bubbling up, which is why we catch errors from `process`
    counter -= 1;
  }

  workingMemory.current.forceUpdate();
  // lets do the actual processing and wait for all of them to finish
  await Promise.all(workingMemory.current.list.map(enqueueProcessing));

  return workingMemory.current.list;
}

function BulkOperation<Element, Context>({
  input,
  Display,
  process,
  context,
  callback,
}: BulkOperationConfig<Element, Context>) {
  const workingMemory = useRef<WorkingMemory<Element>>({
    completed: false,
    forceUpdate: () => undefined,
    list: [],
    started: false,
    updated: false,
  });

  const [resultList, setResultList] = useState<Element[]>([]);
  const [update, setUpdate] = useState<boolean>(true);
  workingMemory.current.forceUpdate = () => {
    workingMemory.current.updated = true;
    setUpdate(!update);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (workingMemory.current.updated) {
      setResultList(workingMemory.current.list);
      workingMemory.current.updated = false;
    }
    if (workingMemory.current.started) {
      return;
    }
    if (input.length === 0) {
      return;
    }

    window.onbeforeunload = () => 'Are you sure you want to leave?';

    // kick off the work
    workingMemory.current.started = true;
    workingMemory.current.updated = true;
    workingMemory.current.completed = false;
    workingMemory.current.list = input;
    // the then is important to make sure that work actually kicks off
    // but we intentionally do not await here!
    // eslint-disable-next-line promise/catch-or-return
    doSomeBulkOperationWork(workingMemory, process, context).then(
      // eslint-disable-next-line promise/always-return
      (list) => {
        console.log('All Operations completed!');
        if (callback) callback(list);
        window.onbeforeunload = null;
      },
      (reason) => {
        console.error(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `There has been a rejection in the core framework! error: ${reason}`,
        );
      },
    );
  });

  return <Display list={resultList} />;
}

export default BulkOperation;
