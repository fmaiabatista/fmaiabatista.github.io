type LinkProps = {
  href: string;
  label: string;
  newTab?: boolean;
  extraClasses?: string;
  children?: React.ReactNode;
};

export default function Link({
  href,
  label,
  newTab = false,
  extraClasses = "",
  children = null,
}: LinkProps) {
  return (
    <a
      href={href}
      title={label}
      target={newTab ? "_blank" : undefined}
      className={
        "w-fit text-blue-600 no-underline underline-offset-2 hover:text-blue-800 hover:underline" +
        (extraClasses ? " " + extraClasses : "")
      }
    >
      {children || label}
    </a>
  );
}
