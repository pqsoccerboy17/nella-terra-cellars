import { platforms } from '../../data/dummy'
import PlatformCard from '../ui/PlatformCard'
import { AnimatedSection, AnimatedDiv } from '../shared/AnimatedSection'
import PageTransition from '../shared/PageTransition'

export default function Platforms() {
  return (
    <PageTransition>
      <section className="section-padding bg-parchment">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="section-label">Your Data Today</span>
            <h2 className="font-display text-3xl md:text-5xl text-slate font-bold mb-4">
              Where Your Data Lives Today
            </h2>
            <p className="text-cork text-lg max-w-2xl mx-auto">
              Four platforms, four logins, four exports. Today, none of these systems talk to each other.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {platforms.map((p, i) => (
              <AnimatedDiv key={p.name} delay={i * 0.1}>
                <PlatformCard {...p} />
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
