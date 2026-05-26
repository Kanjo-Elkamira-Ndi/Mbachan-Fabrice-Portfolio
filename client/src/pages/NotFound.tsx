import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[--bg-primary] px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs text-cyan">// 404</p>
        <h1 className="mt-4 font-display text-7xl font-extrabold text-cyan">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold">Signal lost</h2>
        <p className="mt-2 text-sm text-[--text-secondary]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-[--accent-cyan] px-4 py-2 text-sm font-medium text-[--bg-primary]"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
