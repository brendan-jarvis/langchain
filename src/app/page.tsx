import Image from 'next/image';
import { Langchain } from '@/components/langchain';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="font-mono text-sm lg:flex">
        <Langchain />
      </div>
    </main>
  );
}
