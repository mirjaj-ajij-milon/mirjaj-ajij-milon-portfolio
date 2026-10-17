import { Component, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/context/ThemeContext";
import { ScrollProgress } from "@/components/shared";
import Portfolio from "@/pages/Portfolio";
import NotFound from "@/pages/NotFound";

/* One broken component should never blank the whole site. */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-8 text-center">
          <div>
            <p className="font-mono text-sm text-primary">something broke</p>
            <p className="mt-2 text-muted-foreground">
              Refresh the page — if it persists, check the console.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
}

function App() {
  useLenis();
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <ErrorBoundary>
          <BrowserRouter>
            <ScrollProgress />
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="bottom-right" richColors closeButton />
        </ErrorBoundary>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
