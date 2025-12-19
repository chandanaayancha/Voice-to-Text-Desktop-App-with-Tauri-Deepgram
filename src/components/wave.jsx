export default function Wave() {
  return (
    <div className="flex justify-center gap-1 my-4">
      {[1,2,3,4,5].map(i => (
        <span
          key={i}
          className="w-2 h-6 bg-green-500 rounded animate-pulse"
        />
      ))}
    </div>
  );
}
