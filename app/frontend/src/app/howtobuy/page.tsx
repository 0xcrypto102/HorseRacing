export default function Home() {
  return (
    <div className="flex flex-col h-full md:px-24 p-8 lg:gap-8 gap-20">
      <div className=" text-center text-7xl font-main-title">
        How to <span className="text-primary">Buy</span>
      </div>
      <div className="flex flex-row w-full gap-12 justify-center">
        <div className="lg:flex flex-col gap-24 relative hidden">
          <div className="flex flex-col px-10 py-4 w-[440px] bg-black bg-opacity-20 rounded-3xl backdrop-blur-md justify-center relative">
            <div className=" rounded-full p-4 absolute -top-8 bg-black bg-opacity-30">
              <img src="/images/fi_3884407.png" className="w-10" />
            </div>
            <div className="flex flex-col text-center">
              <div className=" text-primary">STEP-01</div>
              <div className=" font-main-title text-3xl">SELECT A WALLET</div>
              <div className="mt-4">Choose a digital wallet that supports the token you want to purchase. This wallet will securely store your tokens</div>
            </div>
          </div>
          <div className="flex flex-col px-10 py-4 w-[440px] bg-black bg-opacity-20 rounded-3xl backdrop-blur-md justify-center relative top-2">
            <div className=" rounded-full p-4 absolute -top-8 bg-black bg-opacity-30">
              <img src="/images/fi_2228894.png" className="w-10" />
            </div>
            <div className="flex flex-col text-center">
              <div className=" text-primary">STEP-03</div>
              <div className=" font-main-title text-3xl">Find a Reliable Exchange</div>
              <div className="mt-4">{"Once you have cryptocurrency in your wallet, you'll need to find a reliable exchange that lists the token you want to buy."}</div>
            </div>
          </div>
        </div>
        <div className="lg:flex relative hidden">
          <div className="border-4 border-[#F45C12] rounded-full w-4 h-4 bg-primary absolute top-20 -left-14 z-20"></div>
          <div className="border border-dashed border-secondary -rotate-45 h-36 z-10 top-[70px] absolute"></div>
          <div className="border-4 border-[#F45C12] rounded-full w-4 h-4 bg-primary absolute top-[185px] -right-14 z-20"></div>
          <div className="border border-dashed border-secondary rotate-45 h-36 z-10 top-[170px] absolute"></div>
          <div className="border-4 border-[#F45C12] rounded-full w-4 h-4 bg-primary absolute top-72 -left-16"></div>
          <div className="border border-dashed border-secondary -rotate-45 h-36 z-10 top-[270px] absolute"></div>
          <div className="border-4 border-[#F45C12] rounded-full w-4 h-4 bg-primary absolute top-96 -right-16 z-20"></div>
        </div>
        <div className="lg:flex flex-col gap-24 relative hidden">
          <div className="flex flex-col px-10 py-4 w-[440px] bg-black bg-opacity-20 rounded-3xl backdrop-blur-md justify-center relative top-20">
            <div className=" rounded-full p-4 absolute -top-8 bg-black bg-opacity-30">
              <img src="/images/fi_2487011.png" className="w-10" />
            </div>
            <div className="flex flex-col text-center">
              <div className=" text-primary">STEP-02</div>
              <div className=" font-main-title text-3xl">Acquire Cryptocurrency</div>
              <div className="mt-4">{"You'll need to acquire cryptocurrency (such as Bitcoin or Ethereum) to exchange for the token you want to purchase."}</div>
            </div>
          </div>         
          <div className="flex flex-col px-10 py-4 w-[440px] bg-black bg-opacity-20 rounded-3xl backdrop-blur-md justify-center relative top-28">
            <div className=" rounded-full p-4 absolute -top-8 bg-black bg-opacity-30">
              <img src="/images/fi_2228899.png" className="w-10" />
            </div>
            <div className="flex flex-col text-center">
              <div className=" text-primary">{"STEP-04"}</div>
              <div className=" font-main-title text-3xl">Purchase the Token</div>
              <div className="mt-4">{"After selecting the exchange, navigate to the trading section and locate the trading pair for the token you want to buy (SPL Token)."}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-28 lg:hidden justify-center">
          <div className="flex flex-col px-10 py-4 min-[500px]:w-[440px] w-[280px] bg-black bg-opacity-20 rounded-3xl backdrop-blur-md justify-center relative">
            <div className=" rounded-full p-4 absolute -top-8 bg-black bg-opacity-30">
              <img src="/images/fi_3884407.png" className="w-10" />
            </div>
            <div className="flex flex-col text-center">
              <div className=" text-primary">STEP-01</div>
              <div className=" font-main-title text-3xl">SELECT A WALLET</div>
              <div className="mt-4">Choose a digital wallet that supports the token you want to purchase. This wallet will securely store your tokens</div>
            </div>
            <div className="border-4 border-[#F45C12] rounded-full w-4 h-4 bg-primary absolute -bottom-2 z-20 min-[500px]:left-[214px] left-[133px]"></div>
            <div className="border border-dashed border-secondary h-28 -bottom-28 z-10 absolute min-[500px]:left-[221px] left-[140px]"></div>
          </div>
          <div className="flex flex-col px-10 py-4 min-[500px]:w-[440px] w-[280px] bg-black bg-opacity-20 rounded-3xl backdrop-blur-md justify-center relative">
            <div className="border-4 border-[#F45C12] rounded-full w-4 h-4 bg-primary absolute -top-2 z-20 min-[500px]:left-[214px] left-[133px]"></div>
            <div className=" rounded-full p-4 absolute -top-8 bg-black bg-opacity-30">
              <img src="/images/fi_2487011.png" className="w-10" />
            </div>
            <div className="flex flex-col text-center">
              <div className=" text-primary">STEP-02</div>
              <div className=" font-main-title text-3xl">Acquire Cryptocurrency</div>
              <div className="mt-4">{"You'll need to acquire cryptocurrency (such as Bitcoin or Ethereum) to exchange for the token you want to purchase."}</div>
            </div>
            <div className="border-4 border-[#F45C12] rounded-full w-4 h-4 bg-primary absolute -bottom-2 z-20 min-[500px]:left-[214px] left-[133px]"></div>
            <div className="border border-dashed border-secondary h-28 -bottom-28 z-10 absolute min-[500px]:left-[221px] left-[140px]"></div>
          </div>  
          <div className="flex flex-col px-10 py-4 min-[500px]:w-[440px] w-[280px] bg-black bg-opacity-20 rounded-3xl backdrop-blur-md justify-center relative">
            <div className="border-4 border-[#F45C12] rounded-full w-4 h-4 bg-primary absolute -top-2 z-20 min-[500px]:left-[214px] left-[133px]"></div>
            <div className=" rounded-full p-4 absolute -top-8 bg-black bg-opacity-30">
              <img src="/images/fi_2228894.png" className="w-10" />
            </div>
            <div className="flex flex-col text-center">
              <div className=" text-primary">STEP-03</div>
              <div className=" font-main-title text-3xl">Find a Reliable Exchange</div>
              <div className="mt-4">{"Once you have cryptocurrency in your wallet, you'll need to find a reliable exchange that lists the token you want to buy."}</div>
            </div>
            <div className="border-4 border-[#F45C12] rounded-full w-4 h-4 bg-primary absolute -bottom-2 z-20 min-[500px]:left-[214px] left-[133px]"></div>
            <div className="border border-dashed border-secondary h-28 -bottom-28 z-10 absolute min-[500px]:left-[221px] left-[140px]"></div>
          </div>
          <div className="flex flex-col px-10 py-4 min-[500px]:w-[440px] w-[280px] bg-black bg-opacity-20 rounded-3xl backdrop-blur-md justify-center relative">
            <div className="border-4 border-[#F45C12] rounded-full w-4 h-4 bg-primary absolute -top-2 z-20 min-[500px]:left-[214px] left-[133px]"></div>
            <div className=" rounded-full p-4 absolute -top-8 bg-black bg-opacity-30">
              <img src="/images/fi_2228899.png" className="w-10" />
            </div>
            <div className="flex flex-col text-center">
              <div className=" text-primary">STEP-04</div>
              <div className=" font-main-title text-3xl">Purchase the Token</div>
              <div className="mt-4">{"After selecting the exchange, navigate to the trading section and locate the trading pair for the token you want to buy (SPL Token)."}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}