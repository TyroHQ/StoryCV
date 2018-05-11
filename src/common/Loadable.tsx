import * as React from "react";
import { branch, mapProps, renderComponent } from "recompose";
import { Text } from "react-native";

const Loading = () => <Text>Loading...</Text>;

// TODO: This file is not very DRY. We should pick fewer patterns and stick to them, or at least compose these functions more

export const enum LoadableState {
  LOADED,
  FAILED,
  PENDING,
  UNKNOWN,
  PARTIAL
}

export type Loadable<T> =
  | {
      state: LoadableState.LOADED;
      item: T;
    }
  | {
      state: LoadableState.FAILED;
      error?: string;
    }
  | { state: LoadableState.PENDING | LoadableState.UNKNOWN };

export type PartialLoadable<T, P extends keyof T> =
  | Loadable<T>
  | {
      state: LoadableState.PARTIAL;
      item: Pick<T, P>;
    };

export const withLoader = branch<Loadable<any>>(
  x => x.state === LoadableState.PENDING,
  renderComponent(Loading)
);

export const with404 = branch<Loadable<any>>(
  x =>
    console.log("Checking error") ||
    x.state === LoadableState.FAILED ||
    x.state === LoadableState.UNKNOWN,
  renderComponent(() => <Text>Not Found</Text>)
);

export const withPartlyLoadedContent = function<L, P extends keyof L>(
  WrappedComponent: React.ComponentType<L>
) {
  return mapProps<L | Pick<L, P>, PartialLoadable<L, P>>(l => {
    if (l.state !== LoadableState.LOADED && l.state !== LoadableState.PARTIAL) {
      console.error("Loadable snuck through", l);
      throw new Error("Loadable snuck through");
    }
    return l.item;
  })(WrappedComponent);
};

export const withLoadedContent = function<L>(
  WrappedComponent: React.ComponentType<L>
) {
  return mapProps<L, Loadable<L>>(l => {
    if (l.state !== LoadableState.LOADED) {
      console.error("Loadable snuck through", l);
      throw new Error("Loadable snuck through");
    }
    return l.item;
  })(WrappedComponent);
};

export const withLoaderForProp = <K extends string>(k: K) =>
  branch<{ [P in K]: Loadable<any> }>(
    x => console.log("Checking loaded") || x[k].state === LoadableState.PENDING,
    renderComponent(Loading)
  );

export const with404ForProp = <K extends string>(k: K) =>
  branch<{ [P in K]: Loadable<any> }>(
    x =>
      console.log("Checking error") ||
      x[k].state === LoadableState.FAILED ||
      x[k].state === LoadableState.UNKNOWN,
    renderComponent(() => <Text>Page Not Found</Text>)
  );

export const withSpreadPartlyLoadedProp = <
  K extends string,
  L,
  P extends keyof L,
  T extends { [Prop in K]: PartialLoadable<L, P> }
>(
  k: K
) => {
  type Return = Pick<T, Exclude<keyof T, K>> & (L | Pick<L, P>);

  return mapProps<Return, T>(l => {
    let loadable: PartialLoadable<L, P> = l[k];

    if (
      loadable.state !== LoadableState.LOADED &&
      loadable.state !== LoadableState.PARTIAL
    ) {
      console.error("Loadable snuck through", l);
      throw new Error("Loadable snuck through");
    }

    return Object.assign({}, l as Pick<T, Exclude<keyof T, K>>, loadable.item);
  });
};

export const withSpreadLoadedProp = <
  K extends string,
  L,
  T extends { [P in K]: Loadable<L> }
>(
  k: K
) => {
  type Return = Pick<T, Exclude<keyof T, K>> & L;

  return mapProps<Return, T>(l => {
    let loadable: Loadable<L> = l[k];

    if (loadable.state !== LoadableState.LOADED) {
      console.error("Loadable snuck through", l);
      throw new Error("Loadable snuck through");
    }

    return Object.assign({}, l as Pick<T, Exclude<keyof T, K>>, loadable.item);
  });
};

export const withLoadedProp = <
  K extends string,
  L,
  T extends { [P in K]: Loadable<L> }
>(
  k: K
) => {
  type Return = Pick<T, Exclude<keyof T, K>> & { [P in K]: L };

  return mapProps<Return, T>(l => {
    let loadable: Loadable<L> = l[k];

    if (loadable.state !== LoadableState.LOADED) {
      console.error("Loadable snuck through", l);
      throw new Error("Loadable snuck through");
    }

    return Object.assign(
      {},
      l as Pick<T, Exclude<keyof T, K>>,
      { [k]: loadable.item } as { [P in K]: L }
    );
  });
};
