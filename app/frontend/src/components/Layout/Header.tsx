"use client";
import Image from "next/image";
import LaunchIcon from "./LaunchIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header = () => {
  const pathname = usePathname();
  return (
    <div className="h-[90px] lg:mt-2 mt-0 lg:px-[50px] px-4 justify-between p-4 border-b border-b-white w-full border-opacity-40 flex flex-row items-center">
      <div className="flex flex-row items-center gap-14">
        <div className="flex flex-row lg:gap-8 gap-4 items-center">
          <img src="/images/logo.png" alt="My Image" className="object-contain w-18 h-18"/>
          <div className="flex flex-col">
            <div className="font-main-title font-normal text-5xl tracking-wider">
              HORSE
            </div>
            <div className=" tracking-[9px] -mt-2">RACING</div>
          </div>
        </div>
        <div className="flex flex-row font-semibold">
          <div className="hidden lg:flex gap-8">
            <Link
              href="/"
              className={pathname === "/" ? "text-primary underline" : ""}
            >
              HOME
            </Link>
            <Link
              href="/about"
              className={
                pathname === "/about" ? "text-primary underline" : ""
              }
            >
              ABOUT US
            </Link>
            <Link
              href="/tokenomics"
              className={
                pathname === "/tokenomics" ? "text-primary underline" : ""
              }
            >
              TOKENOMICS
            </Link>
            <Link
              href="/howtobuy"
              className={
                pathname === "/howtobuy" ? "text-primary underline" : ""
              }
            >
              HOW TO BUY
            </Link>
          </div>
        </div>
      </div>
      <div className="">
        <button className=" bg-primary text-secondary font-bold rounded-lg p-4 relative flex-row items-center gap-2 hidden lg:flex">
          LAUNCH APP <LaunchIcon />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 border-b-8 border-b-primary border-l-8 border-l-transparent border-r-8 border-r-transparent -mt-2"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-t-8 border-t-primary border-l-8 border-l-transparent border-r-8 border-r-transparent -mb-2"></div>
        </button>
        <button className="block lg:hidden bg-primary rounded-md">
          <Icon icon="majesticons:menu" className="text-black w-8 h-8"/>
        </button>
      </div>
    </div>
  );
};

export default Header;
