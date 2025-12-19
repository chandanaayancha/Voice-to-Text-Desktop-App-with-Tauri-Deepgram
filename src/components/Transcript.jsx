export default function Transcript({ text }) {
  return (
    <div className="bg-[#1c1c28] p-4 rounded-lg min-h-[80px] text-sm">
      {text || "Hold SPACE and speak…"}
    </div>
  );
}
