import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center sm:px-8">
      <p className="meta">404</p>
      <h1 className="display mt-3 text-3xl sm:text-4xl">This page is not in the library.</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        The collection or book you asked for does not exist here. The index of everything that does
        is one link away.
      </p>
      <Link href="/" className="button-secondary mt-8 inline-flex">
        All collections
      </Link>
    </div>
  );
}
