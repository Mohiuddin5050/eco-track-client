import React from "react";
import {
  Leaf,
  Globe2,
  BatteryCharging,
  Droplet,
  Heart,
  Users,
} from "lucide-react";

export default function WhyGoGreen({ heading = "Why Go Green?", bullets }) {
  const defaultBullets = [
    {
      id: 1,
      title: "Reduce your carbon footprint",
      desc: "Small daily changes (transport, energy) add up — lower emissions help slow climate change.",
      Icon: Globe2,
    },
    {
      id: 2,
      title: "Save money over time",
      desc: "Energy-efficient appliances and reduced waste lower household bills.",
      Icon: BatteryCharging,
    },
    {
      id: 3,
      title: "Protect natural resources",
      desc: "Conserving water and reducing plastic keeps ecosystems healthy.",
      Icon: Droplet,
    },
    {
      id: 4,
      title: "Improve community health",
      desc: "Cleaner air, less litter, and more green spaces benefit everyone.",
      Icon: Leaf,
    },
    {
      id: 5,
      title: "Build resilient communities",
      desc: "Local action and shared challenges strengthen social bonds and preparedness.",
      Icon: Users,
    },
    {
      id: 6,
      title: "Feel good — earn badges",
      desc: "Track wins and celebrate progress with achievements that motivate more green habits.",
      Icon: Heart,
    },
  ];

  const items = bullets && bullets.length ? bullets : defaultBullets;

  return (
    <section
      aria-labelledby="why-go-green"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center mb-8">
        <h2
          id="why-go-green"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
        >
          {heading}
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Simple, measurable benefits of sustainable living that anyone can
          join.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ id, title, desc, Icon }) => (
          <article
            key={id}
            className="group bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-emerald-400"
            tabIndex={0}
            aria-labelledby={`benefit-${id}`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-none w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                <Icon className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              </div>
              <div>
                <h3
                  id={`benefit-${id}`}
                  className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  {title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {desc}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                aria-label={`Learn more about ${title}`}
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
