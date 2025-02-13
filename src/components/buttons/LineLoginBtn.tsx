import React from "react";
import { useLiff } from "../../context/LiffProvider";

export default function LineLoginBtn() {
  const { liffObject } = useLiff();

  const loginRequest = async () => {
    if (!liffObject) {
      return;
    }
    const login = await liffObject.login();
    console.log(liffObject.getAccessToken());
    if (!login) {
      return;
    }
  };

  return (
    <button
      onClick={() => {
        loginRequest();
      }}
      className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
    >
      LINE Login
    </button>
  );
}
