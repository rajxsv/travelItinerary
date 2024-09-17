import React from "react";
import { LineWave } from "react-loader-spinner";

export default function Loader() {
  return (
    <>
      <div className="flex flex-col justify-center items-center overflow-clip h-lvh w-full">
        <p>Due to the free tier backend service, requests may take longer then expected</p>
        <p>please stay patient</p>
        <LineWave
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
        />
      </div>
    </>
  );
}
