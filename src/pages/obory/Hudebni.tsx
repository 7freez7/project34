import React from "react";
import Hudba from "../../public/assets/img/Hudba.jpg";

const Hudebni = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="relative rounded-lg overflow-hidden shadow-lg mb-8">
        <img 
          src={`${process.env.PUBLIC_URL}/assets/img/Hudba.jpg`} 
          alt="Hudba" 
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-6">
          <h1 className="text-4xl font-bold text-gray-800">Hudební obor</h1>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <p className="text-lg text-gray-700 mb-4">
          Náš hudební obor nabízí rozmanitou škálu hudebních nástrojů, se kterými tě naučíme zacházet.
        </p>
        <p className="text-lg font-semibold text-gray-800 mb-4">K výběru máme tyto nástroje:</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Baskřídlovka", "Basová kytara", "Bicí", "Elektrofonická kytara",
            "Elektronické klávesy", "Housle", "Klarinet", "Klavír", "Kytara",
            "Příčná flétna", "Zobcová flétna", "Saxofon", "Trubka",
            "Violoncello", "Kontrabas"
          ].map((nastroj) => (
            <li key={nastroj} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors">
              <span className="text-blue-600">•</span>
              <span className="text-gray-700">{nastroj}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Hudebni;