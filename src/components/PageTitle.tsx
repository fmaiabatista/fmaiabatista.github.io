import Link from "./Link";

type PageTitleProps = {
  title: string;
  breadcrumb?: boolean;
};

export default function PageTitle({
  title,
  breadcrumb = true,
}: PageTitleProps) {
  const label = "home";

  return (
    <div data-id="PageTitle" className="grid items-center">
      <h1 className="col-end-2 row-start-1 flex flex-1 items-center justify-center text-2xl">
        {title}
      </h1>
      {breadcrumb && (
        <Link href="/" label={label} extraClasses="col-end-2 row-start-1">
          ← {label}
        </Link>
      )}
    </div>
  );
}
