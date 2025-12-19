export default function MicButton({ active }) {
  return (
    <div className="flex justify-center my-4">
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl
        ${active ? "bg-red-600 animate-ping" : "bg-green-600"}`}
      >
        🎤
      </div>
    </div>
  );
}
