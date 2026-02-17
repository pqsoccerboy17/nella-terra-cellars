/**
 * Renders text with the wine-to-gold brand gradient.
 * Use `subtle` for a softer variant.
 */
export default function GradientText({ children, as: Component = 'span', subtle = false, className = '' }) {
  return (
    <Component className={`${subtle ? 'gradient-text-subtle' : 'gradient-text'} ${className}`}>
      {children}
    </Component>
  )
}
