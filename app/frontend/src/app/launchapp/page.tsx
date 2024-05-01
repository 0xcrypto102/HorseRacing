export default function Home() {
  return (
    <div className="flex flex-col md:flex-row h-full md:p-6 p-8 gap-4">
      <div className="flex-1">
        {/* part1 start*/}
        <div className="md:py-4 py-4 px-16 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center gap-4">
          <div className=" font-main-title text-5xl w-full text-center">
            horse race <span className="text-primary">winodw</span>
          </div>
          <div className="flex flex-row gap-4 justify-center mt-6">
            <div className="bg-black bg-opacity-10 rounded-md backdrop-blur-md p-2">
              25%
            </div>
            <div className="bg-black bg-opacity-10 rounded-md backdrop-blur-md p-2">
              50%
            </div>
            <div className="bg-black bg-opacity-10 rounded-md backdrop-blur-md p-2">
              75%
            </div>
            <div className="bg-black bg-opacity-10 rounded-md backdrop-blur-md p-2">
              100%
            </div>
          </div>
          <div className="flex flex-row w-full gap-2 mt-4">
            <div className="flex flex-col w-1/2 bg-black bg-opacity-10 rounded-md backdrop-blur-md p-2">
              <div className=" text-left text-xs">
                Wallet Total Token Amount
              </div>
              <div className=" text-left text-xl overflow-scroll">19,00000000000000</div>
            </div>
            <div className="flex flex-col w-1/4 bg-black bg-opacity-10 rounded-md backdrop-blur-md p-2">
              <div className=" text-left text-xs">Horse Number</div>
              <div className=" text-left text-xl overflow-scroll">02</div>
            </div>
            <button className=" bg-primary text-secondary font-extrabold rounded-md p-2 px-4 w-1/4">
              PLACE BET
            </button>
          </div>
          <div className="flex flex-col bg-black bg-opacity-10 rounded-md backdrop-blur-md p-2 w-full mt-4">
            <div className=" text-center text-xs">Current Bet</div>
            <div className=" text-center text-xl overflow-scroll">24,000000000000000</div>
          </div>
        </div>
        {/* part1 end*/}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          {/* part2 start*/}
          <div className="flex-1 justify-center items-center md:px-4 px-4 md:py-6 py-6 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center">
            <div className="font-main-title text-3xl">Connected Wallets</div>
            <div className="font-main-title text-3xl text-primary">
              Previous Bets
            </div>
            <div className="rounded-md border border-[#eeeeee] flex flex-col mt-4 mx-auto">
              <div className="border-b border-b-[#eeeeee] p-2">
                22,00000000000 on #1
              </div>
              <div className="border-b border-b-[#eeeeee] p-2">
                22,00000000000 on #1
              </div>
              <div className="p-2">22,00000000000 on #1</div>
            </div>
          </div>
          {/* part2 end*/}
          {/* part3 start*/}
          <div className="flex-1 items-center md:px-4 px-4 md:py-6 py-6 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center">
            <div className="font-main-title text-3xl">
              a running list of active bets
            </div>
            <div className="font-main-title text-3xl text-primary">
              placed by everyone
            </div>
            <div className="rounded-md border border-[#eeeeee] flex flex-col mt-4 mx-auto">
              <div className="border-b border-b-[#eeeeee] p-2">
                jfkL bet 100000 on #1!
              </div>
              <div className="border-b border-b-[#eeeeee] p-2">
                55SL bet 10438784 on #4!
              </div>
              <div className="border-b border-b-[#eeeeee] p-2">
                kvsl bet 9999999 on #2!
              </div>
              <div className="p-2">KXDX bet 1111 on #6!</div>
            </div>
          </div>
          {/* part3 end*/}
        </div>
      </div>
      {/* part4 end*/}
      <div className="flex-2 p-6 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center h-full flex flex-col justify-between">
        <div className="flex justify-center lg:gap-4 gap-2">
          <img
            src="/images/logo.png"
            alt="Horse logo image"
            className="object-contain w-18 h-18"
          />
          <div className="flex flex-col">
            <div className="font-main-title font-normal text-5xl tracking-wider">
              HORSE
            </div>
            <div className="tracking-[9px] -mt-2">RACING</div>
          </div>
        </div>
        
        <div className="flex flex-col border-b-2 border-b-white py-4 border-opacity-20">
          <div> xKDK: yo this is so fun</div>
          <div> 88KL: omg i love horses</div>
          <div> KDFL: just lost my house</div>
        </div>
        
        <div className="flex flex-col gap-4 grow overflow-auto py-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 ml-auto pl-10">
              <div className="flex flex-row bg-white w-fit text-secondary rounded-md p-2 text-xs mt-5">
                {"Hey there! Did you catch the horse race yesterday?"}
              </div>
              <div className="">
                <img src="/images/logo.png" className=" rounded-full w-8 h-8" />
                <div className=" text-xs"> John</div>
              </div>
            </div>

            <div className="flex flex-row gap-2 mr-auto pr-10">
              <div className="">
                <img src="/images/logo.png" className=" rounded-full w-8 h-8" />
                <div className=" text-xs"> John</div>
              </div>
              <div className="flex flex-row bg-primary w-fit text-secondary rounded-md p-2 text-xs mt-5">
                {"Yeah, it was incredible! That final stretch had me on the edge of my seat."}
              </div>
            </div>

            <div className="flex flex-row gap-2 ml-auto pl-10">
              <div className="flex flex-row bg-white w-fit text-secondary rounded-md p-2 text-xs mt-5">
                {"Right? I couldn't believe how Horse Whisperer came from behind to take the lead."}
              </div>
              <div className="">
                <img src="/images/logo.png" className=" rounded-full w-8 h-8" />
                <div className=" text-xs"> John</div>
              </div>
            </div>

            <div className="flex flex-row gap-2 mr-auto pr-10">
              <div className="">
                <img src="/images/logo.png" className=" rounded-full w-8 h-8" />
                <div className=" text-xs"> John</div>
              </div>
              <div className="flex flex-row bg-primary w-fit text-secondary rounded-md p-2 text-xs mt-5">
                {"Absolutely. It just goes to show the importance of a strong finish."}
              </div>
            </div>

            <div className="flex flex-row gap-2 ml-auto pl-10">
              <div className="flex flex-row bg-white w-fit text-secondary rounded-md p-2 text-xs mt-5">
                {"Right? I couldn't believe how Horse Whisperer came from behind to take the lead."}
              </div>
              <div className="">
                <img src="/images/logo.png" className=" rounded-full w-8 h-8" />
                <div className=" text-xs"> John</div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex flex-row items-center relative">
          <input
            type="text"
            className="p-2 w-full bg-transparent rounded-3xl border relative pl-4"
            placeholder="Ask me anything"
          />
          <img
            src="/images/fi_2221899.png"
            className=" absolute right-1 p-2 bg-primary rounded-full"
          />
        </div>
      </div>
      {/* part4 end*/}
    </div>
  );
}
