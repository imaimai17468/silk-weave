import Image from "next/image";

export const Logo = (): React.ReactNode => {
  return (
    <div className="flex items-center gap-2">
      <Image src="/image/icon.svg" alt="Silk Weave" width={32} height={32} />
      <p className="text-2xl font-bold">Silk Weave</p>
    </div>
  );
};
