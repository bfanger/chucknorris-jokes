import type { ReactNode } from "react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-800 p-3 text-center text-xs text-slate-300">
      An assignment by <FooterLink href="https://bfanger.nl">Bob Fanger</FooterLink> for{" "}
      <FooterLink href="https://frontvalue.nl">FrontValue</FooterLink>.<br />
      Jokes are provided by <FooterLink href="https://chucknorris.io">chucknorris.io</FooterLink>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  children: ReactNode;
}
function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <a className="text-slate-400 hover:text-slate-200 hover:underline" href={href}>
      {children}
    </a>
  );
}
