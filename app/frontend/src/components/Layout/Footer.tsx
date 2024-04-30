'use client'
import { Icon } from '@iconify/react';
import DexScreenSvg from "./DexIcon";

const Footer: React.FC = () => {
  return (
    <div className="flex md:flex-row flex-col md:px-24 px-12 max-[400px]:px-6 items-center justify-between w-full mb-4 gap-2 mt-4">
      <div className="font-inter md:text-base font-medium leading-10 text-sm max-[400px]:text-xs">
        2024 All Rights Reserved - Horses Racing
      </div>
      <div className='flex flex-row items-center gap-2'>
        <button className="p-2 rounded-full border border-white bg-[#201b1a] bg-opacity-40 border-opacity-20 hover:bg-opacity-40 w-14 h-14 mx-auto flex justify-center items-center">
          <Icon icon="pajamas:twitter" className="w-7 h-7" />
        </button>
        <button className="p-2 rounded-full border border-white bg-[#201b1a] bg-opacity-40 border-opacity-20 hover:bg-opacity-40 w-14 h-14 flex justify-center items-center">
          <Icon icon="basil:telegram-solid" className="w-7 h-7" />
        </button>
        <button className="p-2 rounded-full border border-white bg-[#201b1a] bg-opacity-40 border-opacity-20 hover:bg-opacity-40 w-14 h-14 flex justify-center items-center">
          <DexScreenSvg />
        </button>
      </div>

    </div>
  );
}

export default Footer;
