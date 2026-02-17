export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/70 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="font-display text-2xl text-cream font-bold mb-4">
          Ready to build this for real?
        </h3>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          This demo shows what's possible. The integrations are real, the APIs are ready,
          and the automation can be live in weeks — not months.
        </p>
        <a
          href="mailto:mike@yourco.dev"
          className="inline-block bg-wine hover:bg-wine-dark text-cream px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Let's Talk
        </a>
        <p className="mt-12 text-sm text-cream/40">
          Demo using representative data. All figures are illustrative.
          <br />
          Built by Mike Duncan — YourCo
        </p>
      </div>
    </footer>
  )
}
