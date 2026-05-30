import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/stanmax-logo.png"
      alt="Stanmax Laboratories Pvt Ltd"
      width={220}
      height={172}
      priority
      className="h-[4.75rem] w-auto object-contain sm:h-20"
    />
  );
}
