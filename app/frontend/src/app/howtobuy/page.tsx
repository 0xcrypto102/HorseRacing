export default function Home() {
  return (
    <div className="flex flex-col h-full md:p-24 p-8">
      <div className=" text-center text-7xl font-main-title">
        How to <span className="text-primary">Buy</span>
      </div>
      <div className="flex flex-col md:p-10 p-4 w-full bg-black bg-opacity-20 rounded-3xl backdrop-blur-md justify-center">
        <div className="flex flex-row md:gap-4 gap-2 lg:text-8xl font-main-title md:text-7xl text-5xl max-[410px]:text-4xl max-[340px]:text-2xl w-full justify-center">
          <div>WELCOME TO</div>
          <div className="text-primary font-normal">HORSES!</div>
        </div>
        <div>
          Something
        </div>
      </div>
    </div>
  )
}