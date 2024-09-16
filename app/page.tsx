import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <BackgroundBeamsWithCollision className="h-[100vh] md:h-[100vh]">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          Need a ride? We&apos;ve got you covered!{" "}
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-green-500 via-blue-500 to-teal-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Fast, safe, and always on time.
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-green-500 via-blue-500 to-teal-500 py-4">
              Fast, safe, and always on time.
            </div>
          </div>
        </h2>

        <div className="flex justify-center mt-5">
          <Link
            href={"/bookings"}
            className={buttonVariants({
              variant: "secondary",
              className:
                "px-6 lg:px-12 py-3 lg:py-6 border border-blue-500 text-lg lg:text-2xl hover:text-blue-500 transition-all duration-200 ease-linear",
              size: "lg",
            })}
          >
            Order Now
          </Link>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
