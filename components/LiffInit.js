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

        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            // const name = profile.displayName;
            // const lineID = profile.userId;
            setLiffProfile(profile);
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

  console.log(liffProfile);

  return (
    <>
      {liffProfile ? (
        <>
          <div className="flex justify-center flex-col">
            <p className="break-words">{`名前：${
              liffProfile.displayName || "ユーザーネーム"
            }`}</p>
            <p className="break-all">
              {`LINEID：${
                liffProfile.userId ||
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
              }`}
              {/* <span>あなたのLINEIDは</span>
              <span className="break-words">
                {liffProfileId || "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
              </span>
              <span>です</span> */}
            </p>
          </div>
        </>
      ) : null}
    </>
  );
};
export default LiffInit;
