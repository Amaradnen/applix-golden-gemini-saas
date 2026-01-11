import React from "react";

type Props = {
  title?: string;
  description?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Simple layout wrapper used by feature pages.
 * (Avoids build errors when importing `@/components/AppShell`.)
 */
export default function AppShell({ title, description, right, children }: Props) {
  return (
    <div className="min-h-[calc(100vh-80px)]">
      {(title || description || right) && (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {title && (
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-1 text-sm text-white/70 font-semibold">{description}</p>
            )}
          </div>
          {right ? <div className="shrink-0">{right}</div> : null}
        </div>
      )}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
        <div className="p-5 sm:p-7">{children}</div>
      </div>
    </div>
  );
}
