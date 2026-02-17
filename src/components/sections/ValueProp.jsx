import { AnimatedSection, AnimatedDiv } from '../shared/AnimatedSection'
import GradientText from '../shared/GradientText'
import PageTransition from '../shared/PageTransition'
import useCountUp from '../../hooks/useCountUp'

const BEFORE_AFTER = [
  { before: '3-4 hours / month', after: '< 5 minutes', label: 'Time to Report' },
  { before: 'Manual reconciliation', after: 'Automated nightly', label: 'Data Collection' },
  { before: 'Error-prone', after: 'Consistent & auditable', label: 'Accuracy' },
]

const CHECKLIST = [
  'Real-time revenue dashboard',
  'Auto-generated monthly reports',
  'QuickBooks-ready categories',
  'Email alerts for anomalies',
  'Full audit trail on every sync',
]

export default function ValueProp() {
  const { count: hoursCount, ref: hoursRef } = useCountUp(47)

  return (
    <PageTransition>
      <section className="section-padding bg-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="section-label">The Difference</span>
            <h2 className="font-display text-3xl md:text-5xl text-slate font-bold">
              What Changes
            </h2>
          </AnimatedSection>

          {/* Before / After grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {BEFORE_AFTER.map((item, i) => (
              <AnimatedDiv key={item.label} delay={i * 0.1} className="glass glass-hover p-6 text-center">
                <p className="text-sm font-semibold text-cork uppercase tracking-wide mb-3">
                  {item.label}
                </p>
                <p className="text-wine-light line-through text-lg mb-1">{item.before}</p>
                <p className="text-2xl font-bold text-slate">{item.after}</p>
              </AnimatedDiv>
            ))}
          </div>

          {/* Hero metric with count-up */}
          <AnimatedDiv className="text-center mb-16">
            <div ref={hoursRef}>
              <p className="font-display text-6xl md:text-8xl text-wine font-bold">
                <GradientText as="span" className="font-display text-6xl md:text-8xl font-bold">
                  {hoursCount} Hours
                </GradientText>
              </p>
              <p className="text-xl text-cork mt-2">saved per year</p>
            </div>
          </AnimatedDiv>

          {/* Pull quote */}
          <AnimatedDiv className="max-w-2xl mx-auto bg-cream border-l-4 border-wine pl-6 py-4 mb-16">
            <p className="font-display text-xl md:text-2xl text-slate italic leading-relaxed">
              "I used to dread the first week of every month."
            </p>
          </AnimatedDiv>

          {/* Checklist */}
          <AnimatedDiv className="max-w-md mx-auto">
            <h3 className="font-semibold text-lg text-slate mb-4 text-center">
              What you get:
            </h3>
            <ul className="space-y-3">
              {CHECKLIST.map((item, i) => (
                <AnimatedDiv key={item} delay={i * 0.08} className="flex items-start gap-3">
                  <span className="mt-0.5 text-sage font-bold text-lg leading-none">&#10003;</span>
                  <span className="text-cork">{item}</span>
                </AnimatedDiv>
              ))}
            </ul>
          </AnimatedDiv>
        </div>
      </section>
    </PageTransition>
  )
}
