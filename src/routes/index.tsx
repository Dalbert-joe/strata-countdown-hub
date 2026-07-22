import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import logo from "../Starta ogo.jpeg";
import background from "../bg site.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STRATA '26 — AI & DS Symposium" },
      { name: "description", content: "STRATA '26: The annual AI & Data Science Symposium. Join us on 8 August 2026." },
      { property: "og:title", content: "STRATA '26 — AI & DS Symposium" },
      { property: "og:description", content: "STRATA '26: The annual AI & Data Science Symposium. Join us on 8 August 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EVENT_DATE = new Date(2026, 7, 8); // Aug 8, 2026 (month is 0-indexed)

function getCountdownText(): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(EVENT_DATE.getFullYear(), EVENT_DATE.getMonth(), EVENT_DATE.getDate());
  const diffMs = target.getTime() - today.getTime();
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (days > 0) return `${days} Day${days === 1 ? "" : "s"} to Go!`;
  if (days === 0) return "Today is STRATA!";
  return "STRATA has begun!";
}

function msUntilNextMidnight(): number {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
  return next.getTime() - now.getTime();
}

function Index() {
  const [countdown, setCountdown] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCountdown(getCountdownText());
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;
    const scheduleMidnight = () => {
      timeoutId = setTimeout(() => {
        setCountdown(getCountdownText());
        intervalId = setInterval(() => setCountdown(getCountdownText()), 24 * 60 * 60 * 1000);
      }, msUntilNextMidnight());
    };
    scheduleMidnight();
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login Successful!");
    setOpen(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0a0a0a] text-[#e8dcc0]">
      {/* Blurred background image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: `url(${background})` }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/60" />

      {/* Top nav */}
      <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-10 lg:px-12">
        <div className="text-xs font-semibold tracking-[0.25em] text-[#c9a961] sm:text-sm sm:tracking-[0.3em]">STRATA '26</div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-[#c9a961]/60 bg-transparent text-xs text-[#e8dcc0] hover:bg-[#c9a961] hover:text-black transition-all sm:text-sm"
            >
              Login
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#111] border-[#c9a961]/30 text-[#e8dcc0] w-[calc(100%-2rem)] max-w-sm rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-[#c9a961] tracking-wider">Login to STRATA '26</DialogTitle>
              <DialogDescription className="text-[#e8dcc0]/70">
                Enter your details to register for the symposium.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" className="bg-black/40 border-[#c9a961]/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" className="bg-black/40 border-[#c9a961]/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" className="bg-black/40 border-[#c9a961]/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" className="bg-black/40 border-[#c9a961]/30" />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-[#c9a961] text-black hover:bg-[#d4b872]">
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-6 pb-12 text-center sm:px-6 sm:pt-8 sm:pb-16 md:px-10 md:pt-12 md:pb-20 lg:px-12">
        <h1 className="sr-only">STRATA '26 — AI & DS Symposium</h1>

        <div className="mb-6 animate-[fadeIn_0.9s_ease-out] sm:mb-8 md:mb-10">
          <img
            src={logo}
            alt="STRATA '26 logo"
            className="mx-auto h-48 w-48 object-contain drop-shadow-[0_0_30px_rgba(201,169,97,0.25)] sm:h-60 sm:w-60 md:h-80 md:w-80 lg:h-[26rem] lg:w-[26rem] xl:h-[30rem] xl:w-[30rem]"
          />
        </div>

        <p className="mb-2 max-w-xl text-[10px] font-medium uppercase leading-relaxed tracking-[0.3em] text-[#c9a961]/80 sm:text-xs sm:tracking-[0.4em] md:mb-3 md:text-sm">
          Artificial Intelligence and Data Science Symposium
        </p>

        <div
          key={countdown}
          className="animate-[fadeUp_0.7s_ease-out] text-2xl font-bold tracking-tight text-[#e8dcc0] sm:text-3xl md:text-4xl lg:text-5xl"
        >
          {countdown || "\u00A0"}
        </div>

        <p className="mt-5 text-xs text-[#e8dcc0]/60 sm:text-sm md:mt-6 md:text-base">
          August 8, 2026
        </p>
      </main>

      <footer className="relative z-10 mt-auto border-t border-[#c9a961]/10 py-5 text-center text-[10px] text-[#e8dcc0]/40 sm:py-6 sm:text-xs">
        © 2026 STRATA — AI &amp; DS Symposium
      </footer>

      <Toaster theme="dark" />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
