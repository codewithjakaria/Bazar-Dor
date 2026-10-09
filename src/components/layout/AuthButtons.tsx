import Link from 'next/link';

export default function AuthButtons() {
  return (
    <div className="flex gap-2">
      <Link
        href="/signin"
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100"
      >
      
      </Link>

    
      <Link
        href="/signup"
        className="px-3 py-1.5 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800"
      >
        
      </Link>
    </div>
  );
}
