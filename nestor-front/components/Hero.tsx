import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#c72027]">
      <Image 
        src="/herosection.png" 
        alt="Hero" 
        width={1920} 
        height={1080} 
        className="w-full h-full object-cover" 
        priority
      />
      
      {/* Bouton Commander une pizza positionné sur l'image */}
      <Link
        href="/menu"
        className="absolute left-[29%] top-[52%] transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#ffd966] to-[#f4a500] hover:from-[#ffe680] hover:to-[#ff9900] text-[#7d4e1e] font-black px-7 py-3 sm:px-9 sm:py-3.5 md:px-10 md:py-4 rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-110 text-base sm:text-lg md:text-xl z-10 border-[3px] border-[#d89000] active:scale-95 cursor-pointer"
        style={{
          textShadow: '1px 1px 3px rgba(125,78,30,0.4)',        }}
      >
        Commander pizza ou menu
      </Link>
    </section>
  );
}
