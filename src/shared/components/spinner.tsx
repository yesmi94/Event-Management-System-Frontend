// src/shared/components/Spinner.tsx

export default function Spinner() {
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
