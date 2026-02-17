import { platforms } from '../../data/dummy'
import PlatformCard from '../ui/PlatformCard'

export default function Platforms() {
  return (
    <section id="platforms" className="py-24 bg-parchment">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-5xl text-slate font-bold text-center mb-4">
          Where Your Data Lives Today
        </h2>
        <p className="text-center text-cork text-lg mb-12 max-w-2xl mx-auto">
          Four platforms, four logins, four exports. Today, none of these systems talk to each other.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {platforms.map((p) => (
            <PlatformCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
