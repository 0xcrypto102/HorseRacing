"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full md:p-24 p-8 gap-4">
      <div className="flex 2xl:flex-row gap-4 w-full flex-col">
        <div className="flex flex-row flex-1 md:p-10 p-4 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center gap-4">
          <img src="/images/coin.png" className="w-20 h-20" />
          <div className="flex flex-col text-left">
            <div className="text-8xl font-medium font-main-title -mt-2">01</div>
            <div className="  text-lg font-medium -mt-2">Billion tokens</div>
          </div>
        </div>
        <div className="flex flex-row flex-1 md:p-10 p-4 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center gap-4">
          <img src="/images/plus.png" className="w-20 h-20"/>
          <div className="flex flex-col text-left">
            <div className=" text-8xl font-medium font-main-title -mt-2">85%</div>
            <div className="  text-lg font-medium -mt-2">Added to LP</div>
          </div>
        </div>
        <div className="flex flex-row flex-1 md:p-10 p-4 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center gap-4">
          <img src="/images/megaphone.png" className="w-20 h-20"/>
          <div className="flex flex-col text-left">
            <div className=" text-8xl font-medium font-main-title -mt-2">5%</div>
            <div className="  text-lg font-medium -mt-2">Saved for future <br />marketing</div>
          </div>
        </div>
      </div>
      <div className="flex 2xl:flex-row gap-4 w-full flex-col">
        <div className="flex flex-row flex-1 md:p-10 p-4 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center gap-4">
          <img src="/images/goal.png" className="w-20 h-20" />
          <div className="flex flex-col text-left">
            <div className=" text-8xl font-medium font-main-title -mt-2">10%</div>
            <div className="  text-lg font-medium -mt-2">For development</div>
          </div>
        </div>
        <div className="flex flex-1 md:p-10 p-4 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center gap-4  ">
          <img src="/images/fire.png" className="w-20 h-20"/>
          <div className="flex flex-col text-left ">
            <div className=" min-[480px]:text-8xl font-medium font-main-title -mt-2 text-6xl">LIQUIDITY</div>
            <div className="  text-lg font-medium -mt-2">Burned</div>
          </div>
        </div>
        <div className="flex flex-row flex-1 md:p-10 p-4 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center gap-4">
          <img src="/images/check.png" className="w-20 h-20"/>
          <div className="flex flex-col text-left">
            <div className=" text-8xl font-medium font-main-title -mt-2">RIGHT</div>
            <div className="  text-lg font-medium -mt-2">Revoked</div>
          </div>
        </div>
      </div>
      <div className="md:mt-8 mt-4">
        <button className=" bg-primary text-secondary font-bold rounded-lg p-4 relative flex-row items-center gap-2 flex">
          EXPLORE SPL TOKEN <Icon icon="carbon:arrow-right" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 border-b-8 border-b-primary border-l-8 border-l-transparent border-r-8 border-r-transparent -mt-2"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-t-8 border-t-primary border-l-8 border-l-transparent border-r-8 border-r-transparent -mb-2"></div>
        </button>
      </div>
    </div>
  );
}
