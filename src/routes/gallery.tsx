import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "ギャラリー | わたしの日常" },
      { name: "description", content: "ありふれた瞬間の、小さな記録。" },
      { property: "og:title", content: "ギャラリー | わたしの日常" },
      { property: "og:description", content: "ありふれた瞬間の、小さな記録。" },
    ],
  }),
  component: Gallery,
});

const PHOTOS = [
  ["photo-1495774856032-8b90bbb3a3fd", "朝の光とコーヒー"],
  ["photo-1490633874781-1c63cc424610", "週末のカフェ時間"],
  ["photo-1481272308-c325f81f1d36", "窓辺の緑"],
  ["photo-1519689680058-71d812f1e3e4", "読みかけの本"],
  ["photo-1526406915894-7bcd65c60b46", "のんびりお散歩"],
  ["photo-1494253106108-1b5065d83929", "夜の灯り"],
  ["photo-1466637534441-6f834e2a4a8f", "季節の花"],
];

function Gallery() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("nichijou-in")) navigate({ to: "/login" });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b px-8 py-6 md:px-16">
        <div>
          <p className="mb-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">A daily photo diary</p>
          <h1 className="font-display text-2xl text-foreground md:text-3xl">わたしの日常</h1>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem("nichijou-in"); navigate({ to: "/" }); }}
          className="rounded-full border px-5 py-2.5 text-sm text-foreground transition hover:bg-muted"
        >
          おわる
        </button>
      </header>
      <main className="px-8 py-10 md:px-16">
        <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground">これがわたしの日常。ありふれた瞬間の、小さな記録です。</p>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {PHOTOS.map(([id, caption]) => (
            <figure key={id} className="break-inside-avoid">
              <img src={`https://images.unsplash.com/${id}?w=800&q=80`} alt={caption} loading="lazy" className="w-full rounded-2xl object-cover shadow-sm" />
              <figcaption className="mt-2 px-1 text-sm text-muted-foreground">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </main>
    </div>
  );
}
