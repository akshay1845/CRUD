import React, { createContext, useState } from "react";

interface AppContextInterface {
  account: boolean;
  setAccount: Function;
}

type Context = {
  children: React.ReactNode;
};

export const Logincontext = createContext<AppContextInterface | null>(null);

const Context = ({ children }: Context) => {
  const [account, setAccount] = useState<boolean>(false);

  return (
    <>
      <Logincontext.Provider value={{ account, setAccount }}>
        {children}
      </Logincontext.Provider>
    </>
  );
};

export default Context;
