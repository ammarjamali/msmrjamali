import { Link } from 'react-router-dom'

function About() {
  return (
    <div>
      <section className="bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-3">About MSMR Jamali</h1>
          <p className="text-lg text-gray-300 italic">
            Manufacturing Quality, Trading Honestly
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-brand-navy mb-4">
          From trading to manufacturing
        </h2>
        <p className="text-brand-charcoal leading-relaxed mb-4">
          MSMR Jamali's roots go back to 1953 — decades of trading experience
          and trust that, in 2013, we brought into the manufacturing of
          commercial-grade steel storage solutions. Today, we specialize in
          engineering heavy-duty furniture built to handle the daily
          wear-and-tear of busy workspaces, record rooms, and industrial
          facilities.
        </p>
      </section>

      <section className="bg-brand-grey/40">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-brand-navy mb-4">
            Our manufacturing standards
          </h2>
          <p className="text-brand-charcoal leading-relaxed mb-4">
            We build our products — from Office Almirahs to Slotted Angle
            Racks — with strict attention to structural integrity. Rather
            than cutting corners to produce a cheaper rack, we focus on exact
            specifications: our slotted angles are formed with accurate
            L-shape geometry and precise punching, ensuring perfect alignment
            and even load distribution.
          </p>
          <p className="text-brand-charcoal leading-relaxed">
            We categorize our steel strictly by accurate gauges — Light,
            Medium, and Heavy — so our storage units outlast cheaper
            alternatives.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-brand-navy mb-2">Our core promise</h2>
        <p className="text-brand-charcoal leading-relaxed mb-10">
          If you leave with one understanding about MSMR Jamali, it should be
          our commitment to absolute transparency.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="bg-white border border-brand-grey rounded-lg p-6">
            <h3 className="text-lg font-bold text-brand-blue mb-2">
              Fix Rate — "Ek Daam"
            </h3>
            <p className="text-sm text-brand-charcoal leading-relaxed">
              No time wasted on bargaining — just honest, upfront pricing
              from the start.
            </p>
          </div>

          <div className="bg-white border border-brand-grey rounded-lg p-6">
            <h3 className="text-lg font-bold text-brand-red mb-2">
              True Gauge Guarantee
            </h3>
            <p className="text-sm text-brand-charcoal leading-relaxed">
              We deliver the exact steel thickness we promise. If our gauge
              isn't exactly what we pitched, we offer a 100% money-back
              refund.
            </p>
          </div>
        </div>

        <p className="text-brand-navy font-semibold mt-10 text-center text-lg">
          You get the exact strength you pay for.
        </p>

        <div className="text-center mt-8">
          <Link
            to="/quote"
            className="inline-block bg-brand-red text-white font-semibold px-8 py-3.5 rounded-md hover:bg-red-600 transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About