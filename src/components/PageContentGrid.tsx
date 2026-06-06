type PageContentGridProps = {
  cols?: number;
  children: React.ReactNode;
};

const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export default function PageContentGrid({
  cols = 3,
  children,
}: PageContentGridProps) {
  const gridColsClass = GRID_COLS[cols] ?? "grid-cols-3";

  return (
    <div
      data-id="PageContentGrid"
      className={`m-auto mt-24 grid place-items-center gap-8 ${gridColsClass}`}
    >
      {children}
    </div>
  );
}
