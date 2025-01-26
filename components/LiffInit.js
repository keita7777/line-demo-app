"use client";

import { useState, useEffect } from "react";
import liff from "@line/liff";

const LiffInit = () => {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);
  const [liffProfile, setLiffProfile] = useState(null);

  useEffect(() => {
    console.log("start liff.init()...");
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
      .then(() => {
        console.log("liff.init() done");
        setLiffObject(liff);

        liff.getProfile().then((profile) => {
          const name = profile.displayName;
          setLiffProfile(name);
        });
      })
      .catch((error) => {
        console.log(`liff.init() failed: ${error}`);
        if (!process.env.NEXT_PUBLIC_LIFF_ID) {
          console.info(
            "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
          );
        }
        setLiffError(error.toString());
      });
  }, []);

  return <div>{liffProfile || "名無し"}</div>;
};
export default LiffInit;
