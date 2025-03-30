import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4E1D2] px-4">
      <a
        href="/pay"
        className="inline-block rounded-2xl bg-[#2A9D8F] px-8 py-4 text-white text-lg font-semibold shadow-md transition-all hover:bg-[#21867A] focus:outline-none focus:ring-4 focus:ring-[#8ECAE6]"
      >
        Pay Now
      </a>
    </main>
  );
}