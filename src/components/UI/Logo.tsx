import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-x-4">
      <Image src="/logo.png" height={54} width={54} className="h-[54px]" alt="AlgoPass" />
      <span className="font-bold text-2xl">AlgoPass</span>
    </div>
  );
};
export default Logo;
