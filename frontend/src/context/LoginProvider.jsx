import { useState } from "react";
import { LoginContext } from "./LoginContext";

export default function LoginProvider(props) {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {props.children}
    </LoginContext.Provider>
  );
}
