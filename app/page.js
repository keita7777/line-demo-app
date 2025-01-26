import LiffInit from "@/components/LiffInit";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col h-screen gap-10">
      <h1 className="font-bold text-2xl">LINEデモアプリ</h1>
      <LiffInit />
    </div>
  );
}
