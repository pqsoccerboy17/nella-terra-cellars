export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1920&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-charcoal/75" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h1 className="font-display text-4xl md:text-6xl text-cream font-bold leading-tight mb-6">
          Your revenue lives in four&nbsp;places.
          <br />
          <span className="text-gold">Your report lives in a spreadsheet.</span>
        </h1>
        <p className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-10">
          Every month, you pull data from Commerce7, Tock, Square, and VinoShipper.
          You paste it into Google Sheets. You hand it to your bookkeeper.
          It takes 3-4 hours and something always gets missed.
        </p>
        <a
          href="#value"
          className="inline-block bg-wine hover:bg-wine-dark text-cream px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
        >
          See What Changes
        </a>
      </div>
    </section>
  )
}
