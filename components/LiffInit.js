"use client";

import { useState, useEffect } from "react";
import liff from "@line/liff";

const LiffInit = () => {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);
  const [liffProfileName, setLiffProfileName] = useState(null);
  const [liffProfileId, setLiffProfileId] = useState(null);

  useEffect(() => {
    console.log("start liff.init()...");
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
      .then(() => {
        console.log("liff.init() done");
        setLiffObject(liff);

        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            const name = profile.displayName;
            const lineID = profile.userId;
            setLiffProfileName(name);
            setLiffProfileId(lineID);
          });
        }
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

  return (
    <>
      {liffObject ? (
        <>
          <div className="flex justify-center items-center flex-col">
            <p>{`こんにちわ${liffProfileName || ""}さん`}</p>
            <p>{`あなたのLINEIDは${liffProfileId || ""}です`}</p>
          </div>
        </>
      ) : null}
    </>
  );
};
export default LiffInit;
