import { Loader2 } from "lucide-react";

export default function AuthLoading() {
  return (
    <div className="flex w-full items-center justify-center py-4">
      <Loader2 className="h-6 w-6 animate-spin text-core-blue opacity-70" />
    </div>
  );
}
