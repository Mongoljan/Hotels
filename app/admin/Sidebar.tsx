import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="p-4">
      <div className="text-xl font-bold mb-8">My Sidebar</div>
      <nav className="flex flex-col gap-4">
        <Link
          className="rounded-lg px-4 py-2 bg-gray-200 hover:bg-blue-500 hover:text-white transition-colors"
          href="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="rounded-lg px-4 py-2 bg-gray-200 hover:bg-blue-500 hover:text-white transition-colors"
          href="/reports"
        >
          Reports
        </Link>
        <Link
          className="rounded-lg px-4 py-2 bg-gray-200 hover:bg-blue-500 hover:text-white transition-colors"
          href="/settings"
        >
          Settings
        </Link>
        <Link
          className="rounded-lg px-4 py-2 bg-gray-200 hover:bg-blue-500 hover:text-white transition-colors"
          href="/support"
        >
          Support
        </Link>
      </nav>
    </div>
  );
}
