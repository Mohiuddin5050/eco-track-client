import React from "react";
import { Users, Activity, Lightbulb } from "lucide-react";

export default function HowItWorks({ heading = "How It Works", steps }) {
  const defaultSteps = [
    {
      id: 1,
      title: "Join a Challenge",
      desc: "Browse our list of eco challenges and pick one that fits your lifestyle — from saving energy to reducing plastic.",
      Icon: Users,
    },
    {
      id: 2,
      title: "Track Progress",
      desc: "Update your progress as you complete tasks. See your personal and community impact grow in real time.",
      Icon: Activity,
    },
    {
      id: 3,
      title: "Share Tips",
      desc: "Inspire others by sharing your eco-friendly tips and success stories within the community.",
      Icon: Lightbulb,
    },
  ];

  const items = steps && steps.length ? steps : defaultSteps;

  return (
    <section
      aria-labelledby="how-it-works"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center mb-8">
        <h2
          id="how-it-works"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900"
        >
          {heading}
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Just three steps to start making a measurable difference.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ id, title, desc, Icon }) => (
          <div
            key={id}
            className="flex flex-col items-center text-center bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 mb-4">
              <Icon className="w-7 h-7 text-emerald-600" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
