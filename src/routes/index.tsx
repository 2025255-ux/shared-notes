import { createFileRoute, Link } from "@tanstack/react-router";
import DailyScene from "@/components/DailyScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "わたしの日常" },
      { name: "description", content: "なんでもない日の、ちょっとした瞬間をあつめたフォトダイアリー。" },
      { property: "og:title", content: "わたしの日常" },
      { property: "og:description", content: "なんでもない日の、ちょっとした瞬間をあつめたフォトダイアリー。" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <DailyScene>
      <header className="px-8 py-6 md:px-16">
        <span className="font-display text-xs uppercase tracking-[0.35em] text-on-scene/70">Nichijou</span>
      </header>
      <main className="flex flex-1 flex-col justify-center px-8 md:px-16">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-on-scene/60">A daily photo diary</p>
        <h1 className="font-display max-w-2xl text-5xl leading-tight text-on-scene md:text-7xl">わたしの日常</h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-on-scene/75 md:text-lg">
          なんでもない日の、ちょっとした瞬間をそっと集めました。
          <br />
          見てみる？
        </p>
      </main>
      <footer className="flex justify-end px-8 py-10 md:px-16">
        <Link to="/login" className="pill-button">見るには →</Link>
      </footer>
    </DailyScene>
  );
}
