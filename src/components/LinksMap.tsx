import Link from "./Link";

type LinksMapProps = {
  links: {
    href: string;
    label: string;
  }[];
  newTab?: boolean;
};

export default function LinksMap({ links, newTab = false }: LinksMapProps) {
  return links.map(({ href, label }) => (
    <Link key={label} href={href} newTab={newTab} label={label} />
  ));
}
