import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 pt-24">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Stránka nenalezena</h2>
            <p className="text-gray-600 mb-8">Omlouváme se, ale stránka, kterou hledáte, neexistuje.</p>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full animate-bounce"
                style={{
                  backgroundColor: i === 0 ? "#D7141A" : i === 1 ? "#FFFFFF" : "#11457E",
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Zpět na domovskou stránku
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="text-gray-600">Zkuste to znovu nebo prozkoumejte naše další stránky!</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 bg-blue-200 rounded-full opacity-75 animate-pulse"
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default NotFound

