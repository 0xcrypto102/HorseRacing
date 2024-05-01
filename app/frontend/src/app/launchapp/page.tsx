export default function Home() {
  return (
    <div className="flex h-fit md:p-6 p-8 gap-4">
      <div className="w-2/3">
        <div className="md:py-4 py-4 px-32 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center gap-4">
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
              <div className=" text-left text-sm">
                Wallet Total Token Amount
              </div>
              <div className=" text-left">19,00000000000000</div>
            </div>
            <div className="flex flex-col w-1/4 bg-black bg-opacity-10 rounded-md backdrop-blur-md p-2">
              <div className=" text-left text-sm">Horse Number</div>
              <div className=" text-left">02</div>
            </div>
            <button className=" bg-primary text-secondary font-extrabold rounded-md p-2 px-4 w-1/4">
              PLACE BET
            </button>
          </div>
          <div className="flex flex-col bg-black bg-opacity-10 rounded-md backdrop-blur-md p-2 w-full mt-4">
            <div className=" text-center text-sm">Current Bet</div>
            <div className=" text-center">24,000000000000000</div>
          </div>
        </div>
        <div className="flex mt-4 gap-4">
          <div className="flex-1 justify-center items-center md:p-4 p-4 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center">
            <div className="font-main-title text-3xl">Connected Wallets</div>
            <div className="font-main-title text-3xl text-primary">
              Previous Bets
            </div>
            <div className="rounded-md border border-[#eeeeee] flex flex-col w-fit mt-4 mx-auto">
              <div className="border-b border-b-[#eeeeee] p-2">
                22,00000000000 on #1
              </div>
              <div className="border-b border-b-[#eeeeee] p-2">
                22,00000000000 on #1
              </div>
              <div className="p-2">22,00000000000 on #1</div>
            </div>
          </div>
          <div className="flex-1 items-center md:p-4 p-4 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center">
            <div className="font-main-title text-3xl">
              a running list of active bets
            </div>
            <div className="font-main-title text-3xl text-primary">
              placed by everyone
            </div>
            <div className="rounded-md border border-[#eeeeee] flex flex-col w-fit mt-4 mx-auto">
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
        </div>
      </div>
      <div className="w-1/3 p-6 bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center h-full flex flex-col justify-between">
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
        <div className="flex flex-col border-b border-b-white">
          <div> xKDK: yo this is so fun</div>
          <div> 88KL: omg i love horses</div>
          <div> KDFL: just lost my house</div>
        </div>
        <div className="flex flex-col justify-between gap-4 grow overflow-auto">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row relative gap-2 mt-10">
              <div className=" absolute -top-5 right-0">
                <img src="/images/logo.png" className=" rounded-full w-8 h-8" />
                <div className=" text-xs"> John</div>
              </div>
              <div className="flex flex-row bg-white w-fit text-secondary rounded-md p-2 text-xs absolute right-10">
                Hey there! Did you catch the horse race yesterday?
              </div>
            </div>

            <div className="flex flex-row relative gap-2 mt-12">
              <div className=" absolute -top-5 left-0">
                <img src="/images/logo.png" className=" rounded-full w-8 h-8" />
                <div className=" text-xs"> John</div>
              </div>
              <div className="flex flex-row bg-primary w-fit text-secondary rounded-md p-2 text-xs absolute left-10">
                Yeah, it was incredible! That final stretch had me on the edge
                of my seat.
              </div>
            </div>

            <div className="flex flex-row relative gap-2 mt-16">
              <div className=" absolute -top-5 right-0">
                <img src="/images/logo.png" className=" rounded-full w-8 h-8" />
                <div className=" text-xs"> John</div>
              </div>
              <div className="flex flex-row bg-white w-fit text-secondary rounded-md p-2 text-xs absolute right-10">
                {"Right? I couldn't believe how Horse Whisperer came from behind to take the lead."}
              </div>
            </div>

            <div className="flex flex-row relative gap-2 mt-16">
              <div className=" absolute -top-5 left-0">
                <img src="/images/logo.png" className=" rounded-full w-8 h-8" />
                <div className=" text-xs"> John</div>
              </div>
              <div className="flex flex-row bg-primary w-fit text-secondary rounded-md p-2 text-xs absolute left-10">
                Absolutely. It just goes to show the importance of a strong
                finish.
              </div>
            </div>

            <div className="flex flex-row relative gap-2 mt-12">
              <div className=" absolute -top-5 right-0">
                <img src="/images/logo.png" className=" rounded-full w-8 h-8" />
                <div className=" text-xs"> John</div>
              </div>
              <div className="flex flex-row bg-white w-fit text-secondary rounded-md p-2 text-xs absolute right-10">
                {"Right? I couldn't believe how Horse Whisperer came from behind to take the lead."}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center mt-10 relative">
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
    </div>
  );
}
