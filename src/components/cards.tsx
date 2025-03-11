import { Music, Palette, Music2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function DepartmentCards() {
  const departments = [
    {
      icon: <Music className="w-12 h-12 text-[#FF8A3C]" />,
      title: "Hudební obor",
      link: "/obory/hudebni",
      linkText: "více informací",
      linkColor: "text-[#FF8A3C]",
      description: "Žáci v hudebním oboru poznávají hudbu mnoha žánrů. Samotný obor nabízí zaměření i na zpěv.",
    },
    {
      icon: <Palette className="w-12 h-12 text-[#7AC943]" />,
      title: "Výtvarný obor",
      link: "/obory/vytvarni",
      linkText: "více informací",
      linkColor: "text-[#7AC943]",
      description:
        "Žácí ve výtvarném oboru nachází svůj motivační podnět k uměleckému vztahu ke světu a k sebe sama v něm.",
    },
    {
      icon: <Music2 className="w-12 h-12 text-[#FF4B55]" />,
      title: "Taneční obor",
      link: "/obory/tanecni",
      linkText: "více informací",
      linkColor: "text-[#FF4B55]",
      description: "Žáci v tanečním oboru rozvíjí své prostorové, hudební a taneční cítění.",
    },
  ]

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl">
        {departments.map((dept) => (
          <div
            key={dept.title}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform hover:scale-105"
          >
            <div className="mb-4">{dept.icon}</div>
            <h2 className="text-[#1E3C72] text-xl font-bold mb-2">{dept.title}</h2>
            <p className="text-gray-600 mb-4 text-sm">{dept.description}</p>
            <Link
              to={dept.link}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${dept.linkColor} border-2 border-current flex items-center gap-2`}
            >
              {dept.linkText}
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}