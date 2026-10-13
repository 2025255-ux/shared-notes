import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import DailyScene from "@/components/DailyScene";
import { submitAnswer } from "@/lib/answers.functions";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "ログイン | わたしの日常" },
      { name: "description", content: "すきな食べものと、すきな色をおしえてね。" },
      { property: "og:title", content: "ログイン | わたしの日常" },
      { property: "og:description", content: "すきな食べものと、すきな色をおしえてね。" },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [food, setFood] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<{ food: string; color: string }[] | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!food.trim() || !color.trim()) {
      setError("すきな食べものと、すきな色を入れてね");
      return;
    }
    setLoading(true);
    try {
      const res = await submitAnswer({ data: { food: food.trim(), color: color.trim() } });
      if (res.admin) {
        setList(res.rows);
        return;
      }
      sessionStorage.setItem("nichijou-in", "1");
      navigate({ to: "/gallery" });
    } catch {
      setError("うまくいかなかったよ。もう一回ためしてね");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DailyScene>
      <header className="px-8 py-6 md:px-16">
        <Link to="/" className="text-sm text-on-scene/80 hover:text-on-scene">← もどる</Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md rounded-3xl bg-card/95 p-8 shadow-2xl backdrop-blur md:p-10">
          {list ? (
            <>
              <h1 className="font-display mb-2 text-2xl text-foreground">みんなの回答</h1>
              <p className="mb-6 text-sm text-muted-foreground">{list.length}件</p>
              <ul className="max-h-[60vh] space-y-2 overflow-y-auto text-foreground">
                {list.map((r, i) => (
                  <li key={i} className="border-b pb-2">{r.food}:{r.color}</li>
                ))}
                {list.length === 0 && <li className="text-muted-foreground">まだ回答がないよ</li>}
              </ul>
            </>
          ) : (
            <>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">A daily photo diary</p>
              <h1 className="font-display mb-2 text-3xl text-foreground">わたしの日常</h1>
              <p className="mb-8 text-sm text-muted-foreground">つづきを見るには、こたえてね</p>
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="food" className="text-sm font-medium text-foreground">メールアドレス</label>
                  <input id="food" value={food} onChange={(e) => setFood(e.target.value)} className="field" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="color" className="text-sm font-medium text-foreground">パスワード</label>
                  <input id="color" value={color} onChange={(e) => setColor(e.target.value)} className="field" />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <button type="submit" disabled={loading} className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 active:scale-95 disabled:opacity-60">
                  {loading ? "…" : "見る"}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </DailyScene>
  );
}
