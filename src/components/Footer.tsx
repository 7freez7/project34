import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import Logo from "../data/logo.png"

function Footer() {
  return (
    <footer className="bg-white py-12 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img src={Logo} alt="Logo" className="w-12" />
            <p className="text-gray-600">Základní umělecká škola Heřmanův Městec</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Adresa</h4>
            <Link
              to="https://maps.app.goo.gl/wqRMugnb7fqzdG1PA"
              target="_blank"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Jarkovského 47, 538 03 Heřmanův Městec
            </Link>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Kontaktní údaje</h4>
            <p className="flex items-center text-gray-600">
              <Phone className="w-5 h-5 mr-2" />
              739 411 282 | 469 696 291
            </p>
            <p className="flex items-center text-gray-600">
              <Mail className="w-5 h-5 mr-2" />
              reditel@zushm.cz
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Pracovní doba</h4>
            <p className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              Po - Pá 09:00 - 17:00
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Základní umělecká škola Heřmanův Městec. Všechna práva vyhrazena.
        </div>
      </div>
    </footer>
  )
}

export default Footer

