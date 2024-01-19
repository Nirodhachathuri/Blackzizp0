import React, { useState, useEffect } from "react";
import AnimatedImage from "../components/AnimatedBG";
import * as Icons from "@mui/icons-material";
import axios from "axios";
import jwt_decode from "jwt-decode";

const MyBVPoints = () => {
  useEffect(() => {
    getRefUsers();
  }, []);
  const [balance, setBalance] = useState(null);
  const [leftSideBV, setleftSideBV] = useState(null);
  const [rightSideBV, setrightSideBV] = useState(null);

  const getRefUsers = async () => {
    const resp = await axios.get("https://infinity-new-back.onrender.com/token");
    const decoded = jwt_decode(resp.data.accessToken);

    // setLeftBV(resp.data.leftSideBV); 
    // setRightBV(resp.data.rightSideBV);

    setBalance(decoded.balance);

    
    // setrightSideBV(decoded.rightSideBV);
    // setleftSideBV(decoded.leftSideBV);
  };

  let BVbalance = balance / 5;
  let left = BVbalance / 10;
  let right = BVbalance / 10;

  const bvPoints = [
    { text: "Left BV Points", Icon: "ChevronLeft", bv: left },
    { text: "Right BV Points", Icon: "ChevronRight", bv: right },
    { text: "Total BV Earned", Icon: "AccountBalanceWallet", bv: BVbalance },
  ];

  return (
    <div className="w-full bg-[#1E1E1E] h-full fixed right-0 flex flex-col ">
      <div className="res-body lg:ml-[300px] md:ml-[100px]  flex flex-col">

        <div
          className="flex flex-col dash-body w-full h-screen sm:p-8 p-3 overflow-y-scroll pt-[66px] "
          id="style-6"
        >
          <h2 className="text-[24px] font-semibold text-white">My BV Points</h2>
          <h3 className="text-[18px] font-normal text-[#E08E20]">
            Dashboard &gt; My BV Points{" "}
          </h3>

          <div className="w-full justify-center items-center h-auto flex flex-col mt-5 p-5 ">
            <div className="flex flex-col w-full justify-center items-center space-y-3 relative ">
              <div className="bvpoints w-full flex flex-wrap gap-5 justify-center">
                {bvPoints.map((point) => (
                  <div
                    key={point.text}
                    className={`md:w-4/12 w-full h-[228px] rounded-md border-[1px] cursor-pointer justify-center items-center flex flex-row space-x-5 relative overflow-hidden bg-[#151515]`}
                  >
                    <div className="w-[44px] h-[44px] flex justify-center items-center bg-[#E08E20] text-[#E08E20] bg-opacity-10 rounded-full">
                      {React.createElement(Icons[point.Icon])}
                    </div>
                    <div className="z-10  text-white justify-center items-center flec flex-col">
                      {point.text}
                      <h2 className="text-[22px] text-white">{point.bv} BV</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        
        <div className="w-full h-full absolute object-center -z-20 ">
          <AnimatedImage />
        </div>
      </div>
    </div>
  );
};

export default MyBVPoints;
