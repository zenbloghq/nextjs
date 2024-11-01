import Link from "next/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl mx-auto">
      <nav className="p-4 border-b border-gray-200 flex justify-between items-center">
        <Link className="text-lg font-semibold" href="/">
          Zenblog Next.js
        </Link>
        <Link href="/">Home</Link>
      </nav>
      {children}
      <footer className="p-12 text-center border-t mt-12">
        <p>
          Go write something!{" "}
          <Link className="underline" href="https://zenblog.com">
            Zenblog.com
          </Link>
        </p>
      </footer>
    </div>
  );
}
