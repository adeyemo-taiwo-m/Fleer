import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Fleer — your progressive web app",
};

export default function HomePage() {
  return (
    <main className="home-page">
      {/* Radial glow background */}
      <div className="home-glow" aria-hidden="true" />

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">⚡ Progressive Web App</div>
        <h1 className="hero-title">
          Welcome to <span className="gradient-text">Fleer</span>
        </h1>
        <p className="hero-subtitle">
          Fast. Offline-ready. Installable on any device. <br />
          Start building something great.
        </p>
        <div className="hero-actions">
          <a href="#" className="btn-primary">Get Started →</a>
          <a href="https://web.dev/progressive-web-apps/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Learn about PWAs
          </a>
        </div>
      </section>

      {/* Feature cards */}
      <section className="features" aria-label="PWA Features">
        {[
          { icon: "⚡", title: "Lightning Fast", body: "Next.js App Router with SSR & static generation keeps your app blazing fast on any connection." },
          { icon: "📡", title: "Works Offline", body: "A smart service worker caches assets & pages so users get a seamless experience even without internet." },
          { icon: "📲", title: "Installable", body: "Meets all PWA install criteria — users can add Fleer to their home screen on any platform." },
          { icon: "🔔", title: "Push Notifications", body: "Service worker push support is wired up and ready to connect to your notification backend." },
          { icon: "🎨", title: "Design Tokens", body: "A full CSS custom-property design system with dark mode, safe-area support, and smooth animations." },
          { icon: "🔒", title: "Secure by Default", body: "TypeScript throughout, strict ESLint config, and HTTPS-ready for a production-grade baseline." },
        ].map((f) => (
          <article key={f.title} className="feature-card">
            <span className="feature-icon" aria-hidden="true">{f.icon}</span>
            <h2 className="feature-title">{f.title}</h2>
            <p className="feature-body">{f.body}</p>
          </article>
        ))}
      </section>

      <style>{`
        .home-page {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 4rem 1.5rem 6rem;
          position: relative;
          overflow: hidden;
          gap: 5rem;
        }

        .home-glow {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 50% 0%,   rgba(108,99,255,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 40% 35% at 80% 80%,  rgba(255,101,132,0.10) 0%, transparent 65%),
            radial-gradient(ellipse 40% 35% at 20% 70%,  rgba(67,232,216,0.08) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .hero {
          position: relative;
          z-index: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          max-width: 680px;
          margin-top: 3rem;
          animation: fade-in 0.6s ease both;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 1rem;
          background: rgba(108, 99, 255, 0.15);
          border: 1px solid rgba(108, 99, 255, 0.35);
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-primary);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--color-text);
        }

        .gradient-text {
          background: linear-gradient(135deg, #6c63ff 0%, #ff6584 60%, #43e8d8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: var(--color-text-muted);
          line-height: 1.7;
          max-width: 520px;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }

        .btn-primary {
          padding: 0.75rem 2rem;
          background: var(--color-primary);
          color: #fff;
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: var(--shadow-glow);
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 36px var(--color-primary-glow);
        }

        .btn-ghost {
          padding: 0.75rem 2rem;
          background: transparent;
          color: var(--color-text-muted);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover {
          border-color: var(--color-primary);
          color: var(--color-text);
        }

        .features {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 1.25rem;
          width: 100%;
          max-width: 1000px;
          animation: fade-in 0.8s ease 0.2s both;
        }

        .feature-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(108, 99, 255, 0.4);
          box-shadow: var(--shadow-card);
        }

        .feature-icon {
          font-size: 1.75rem;
          line-height: 1;
        }

        .feature-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-text);
        }

        .feature-body {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.65;
        }
      `}</style>
    </main>
  );
}
