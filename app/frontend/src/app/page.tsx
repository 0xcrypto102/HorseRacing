'use client'
import { Icon } from '@iconify/react';

export default function Home() {
  return (
    <div className="flex items-center h-full md:p-24 p-12">
      <div className="flex flex-col md:p-10 p-4 w-fit bg-black bg-opacity-20 rounded-3xl backdrop-blur-md">
        <div className="flex flex-row items-center gap-0">
          <div className="flex rounded-full border p-2 justify-center items-center border-opacity-20 bg-white bg-opacity-20">
            <img src="/images/horse.png" alt="horse"/>
          </div>
          <div className="flex text-[#F9F010] items-center rounded-3xl border px-2 p-1 border-opacity-10 bg-white bg-opacity-20">
            <div>SOL HORSES</div>
          </div>
        </div>
        <div className="flex flex-row gap-4 md:text-8xl font-main-title text-3xl">
          BUILT ON <span className="text-[#F9F010]">SOLANA</span>
        </div>
        <div className="flex flex-col md:text-xl text-md">
          <div>Welcome to horses! a chainlink VRF powered</div>
          <div>provably fair virtual horse racing!</div>
        </div>
        <div className="flex flex-row md:mt-10 mt-4">
          <button className=" bg-[#F9F010] text-secondary font-bold rounded-lg md:p-4 p-2 relative flex flex-row items-center gap-2 md:text-xl text-xs">
            GET STARTED <Icon icon="carbon:arrow-right" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:border-b-8 border-b-4 border-b-[#F9F010] md:border-l-8 border-l-4 border-l-transparent md:border-r-8 border-r-4 border-r-transparent md:-mt-2 -mt-1" ></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 md:border-t-8 border-t-4 border-t-[#F9F010] md:border-l-8 border-l-4 border-l-transparent md:border-r-8 border-r-4 border-r-transparent md:-mb-2 -mb-1"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
