import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground mb-1 uppercase border-b-2 border-border pb-2 inline-block">
            Pengaturan
          </h1>
          <p className="text-muted-foreground font-bold mt-2">
            Kelola profil dan pengaturan akun admin Anda.
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <UserProfile
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "neo-card neo-shadow border-2 border-border rounded-none",
            },
          }}
        />
      </div>
    </div>
  );
}
