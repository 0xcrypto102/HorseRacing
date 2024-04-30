export default function Home() {
  return (
    <div className="flex items-center h-full md:p-24 p-8">
      <div className="flex flex-col md:p-10 p-4 w-fit bg-black bg-opacity-20 rounded-3xl backdrop-blur-md text-center">
        <div className="flex flex-row md:gap-4 gap-2 lg:text-8xl font-main-title md:text-7xl text-5xl max-[410px]:text-4xl max-[340px]:text-2xl w-full justify-center">
          <div>WELCOME TO</div>
          <div className="text-primary font-normal">HORSES!</div>
        </div>
        <div>
          {"The ultimate virtual horse racing experience powered by Chainlink VRF (Verifiable Random Function), ensuring provably fair outcomes every time. Immerse yourself in the exhilarating world of horse racing where the thrill of the track meets cutting-edge blockchain technology."}
        </div>
      </div>
    </div>
  )
}