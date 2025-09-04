import Auth from "@/components/Auth";
export const metadata = {
  title: "Auth - Resumix",
  description: "Sign in to Resumix",
};
export default function AuthPage() {
  return (
    <main className="bg-gradient bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Please sign in to use Resumix</h2>
          </div>
          <Auth />
        </section>
      </div>
    </main>
  );
}
