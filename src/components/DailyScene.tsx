import type { ReactNode } from "react";

export const BG = "https://images.unsplash.com/photo-1444858345149-8a4086e34f0f?w=2000&q=80";

export default function DailyScene({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-scene">
      <img src={BG} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 scene-overlay" />
      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
}
