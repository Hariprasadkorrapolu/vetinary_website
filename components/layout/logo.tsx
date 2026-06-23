import Image from "next/image";

type LogoProps = {
  variant?: "icon" | "full";
};

export function Logo({ variant }: LogoProps = {}) {
  return (
    <div className="relative w-[140px] h-[39px] sm:w-[180px] sm:h-[50px] lg:w-[220px] lg:h-[62px] transition-transform duration-300 hover:scale-[1.02] ease-out">
      <Image
        src="/stanmax-wordmark.png"
        alt="Stanmax Laboratories Pvt Ltd"
        fill
        priority
        className="object-contain"
        sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 220px"
      />
    </div>
  );
}
