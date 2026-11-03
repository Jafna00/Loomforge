import SectionLabel from '../../../components/common/SectionLabel.jsx';

const steps = [
  {
    n: '01',
    title: 'CREATE PROJECT',
    copy: 'Describe your garment requirements, quantity, timeline, budget, and upload reference designs.',
  },
  {
    n: '02',
    title: 'DISCOVER MANUFACTURERS',
    copy: 'Browse verified manufacturers filtered by specialization, MOQ, capacity, certifications, and location.',
  },
  {
    n: '03',
    title: 'REQUEST QUOTATIONS',
    copy: 'Send RFQs to multiple manufacturers, receive detailed quotations, and compare offers.',
  },
  {
    n: '04',
    title: 'COLLABORATE & TRACK',
    copy: 'Chat in real time, manage revisions, approve samples, and monitor production progress.',
  },
  {
    n: '05',
    title: 'DELIVERY COMPLETE',
    copy: 'Track production milestones until your order is completed and leave reviews to build trust.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-ink text-paper px-6 md:px-10 py-24 md:py-32">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <SectionLabel index="—" dark>
            How a garment gets made
          </SectionLabel>
          <h2 className="font-display uppercase text-[10vw] md:text-[3.4vw] leading-[0.9] tracking-tightest mt-6">
            One roof,
            <br />
            five stages.
          </h2>
          <p className="font-serif italic text-stone mt-6 max-w-xs">
            Design and manufacture usually live in different buildings.
            Here they don't — which is the whole point.
          </p>
        </div>

        <div className="md:col-span-8 border-t border-paper/15">
          {steps.map((step) => (
            <div
              key={step.n}
              className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-8 py-6 border-b border-paper/15 hover:bg-paper/[0.03] transition-colors"
            >
              <span className="font-mono text-sm text-ochre w-12 shrink-0">
                {step.n}
              </span>
              <h3 className="font-display uppercase text-2xl md:text-3xl tracking-tightest md:w-64 shrink-0">
                {step.title}
              </h3>
              <p className="font-body text-stone text-sm md:text-base max-w-md">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}