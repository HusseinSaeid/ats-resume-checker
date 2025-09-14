import Auth from "@/components/Auth";
export const metadata = {
  title: "Auth - Resumix",
  description: "Sign in to Resumix",
};
export default function AuthPage() {
  return (
    <main className="bg-gradient bg-cover min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="gradient-border shadow-2xl backdrop-blur-sm">
          <section className="flex flex-col gap-8 bg-white/95 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-white">R</span>
              </div>
              <h1 className="text-4xl font-bold text-gradient">
                Welcome to Resumix
              </h1>
              <h2 className="text-lg text-gray-600 font-medium">
                Sign in to get started with AI-powered resume analysis
              </h2>
            </div>
            <div className="space-y-4">
              <Auth />
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Secure authentication powered by Puter
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
