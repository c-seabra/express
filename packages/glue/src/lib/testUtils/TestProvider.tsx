import { ApolloProviderProps } from '@apollo/client/react/context';
import React, { Context, FC, Provider } from 'react';

import MockApolloProvider from './MockApolloProvider';
import MockRouter from './MockRouter';
import MockSnackbarProvider from './MockSnackbarProvider';

type ConditionalWrapperProps = {
  condition?: boolean;
  wrapper: (children: any) => any;
};

const ConditionalWrapper: FC<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => {
  if (children) {
    return condition ? wrapper(children) : children;
  }

  return null;
};

const defaultMockAppContext = { slug: '123', token: '132' };

type MockProviderProps = {
  apollo?: boolean;
  appContext?: Context<any>;
  props?: {
    apollo?: ApolloProviderProps<any>;
    appContext?: { value: { slug: string; token: string } };
    router?: { initialEntries?: string[] | string; path?: string };
    snackbar?: any;
  };
  router?: boolean;
  snackbar?: boolean;
};

const EmptyComponent: FC = ({ children }) => <>{children}</>;

type ProviderType = {
  component: FC | Provider<any>;
  props?: any;
  shouldApply?: boolean;
}[];

const TestProvider: FC<MockProviderProps> = ({
  children,
  appContext,
  apollo,
  router,
  snackbar,
  props,
}) => {
  const providers: ProviderType = [
    {
      component: MockSnackbarProvider,
      props: props?.snackbar || {},
      shouldApply: snackbar,
    },
    {
      component: MockApolloProvider,
      props: props?.apollo || {},
      shouldApply: apollo,
    },
    {
      component: MockRouter,
      props: props?.router || {},
      shouldApply: router,
    },
    {
      component: appContext ? appContext.Provider : EmptyComponent,
      props: props?.appContext || { value: defaultMockAppContext },
      shouldApply: !!appContext,
    },
  ];

  return (
    <>
      {providers.reduce((providerStack, provider) => {
        return (
          <ConditionalWrapper
            condition={provider.shouldApply}
            wrapper={(elements) => (
              <provider.component {...provider.props}>
                {elements}
              </provider.component>
            )}
          >
            {providerStack}
          </ConditionalWrapper>
        );
      }, children)}
    </>
  );
};

export default TestProvider;
