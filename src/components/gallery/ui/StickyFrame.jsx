"use client";

export default function StickyFrame({ children }) {
  return (
    <div className="sticky top-0 relative z-10 flex h-[100svh] items-center justify-center px-6 lg:px-16">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {children}
      </div>
    </div>
  );
}
