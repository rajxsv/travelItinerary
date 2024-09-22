import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../public/Animation - 1726768680248.json";

const Loader = () => {
  const [show, setshow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setshow(true);
    }, 5 * 1000);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full h-svh flex flex-col justify-center items-center">
      <Lottie options={defaultOptions} height={200} width={400} />
      {show && (
        <span>
          Due to free tier backend service, initial response may take upto 5 to 8 minutes, 
          Please be patient.
        </span>
      )}
    </div>
  );
};

export default Loader;
