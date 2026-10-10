export default function ProductLoading({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-[#e2ebe3] bg-[#fbfdfb] p-4"
        >
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-24 rounded bg-gray-200" />
              <div className="h-2 w-16 rounded bg-gray-100" />
            </div>
          </div>
          <div className="mt-5 h-3 w-20 rounded bg-gray-100" />
          <div className="mt-2 h-4 w-28 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
