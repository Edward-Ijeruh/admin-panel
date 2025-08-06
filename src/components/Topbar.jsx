import { List } from "phosphor-react";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between md:justify-end">
      <button
        onClick={onMenuClick}
        className="md:hidden text-gray-700 hover:text-black"
      >
        <List size={24} />
      </button>
      <div className="font-semibold">Admin Panel</div>
    </header>
  );
}
