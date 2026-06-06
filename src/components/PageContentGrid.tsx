type PageContentGridProps = {
  cols?: number;
  children: React.ReactNode;
};

export default function PageContentGrid({
  cols = 3,
  children,
}: PageContentGridProps) {
  const gridColsClass = `grid-cols-${cols}`;

  return (
    <div
      data-id="PageContentGrid"
      className={`m-auto mt-24 grid place-items-center gap-8 ${gridColsClass}`}
    >
      {children}
    </div>
  );
}
