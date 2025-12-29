export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-[#2E5BC4] rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-[#4382EC] rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
