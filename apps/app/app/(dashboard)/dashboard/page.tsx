export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-black">
        Welcome to{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-core-blue to-sky">
          Clarise
        </span>
      </h1>
      <p className="mt-4 text-frost/60">
        Your AI-powered learning journey starts here.
      </p>
    </div>
  );
}
