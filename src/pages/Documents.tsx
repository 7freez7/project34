import React from "react";

const Documents = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center">
      <div className="max-w-3xl mx-auto w-full py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">Dokumenty</h1>

      <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-pink-700">Formulář ke stažení</h2>
        <div id="pouceni" className="mb-4 text-gray-700">
        <p>Formuláře pro školní rok 2024/2025</p>
        </div>

        <ul className="space-y-2">
        <li><a href="https://www.zushm.cz/files/odhlaseni-zaka.doc" className="text-blue-600 hover:text-blue-800 hover:underline">Žádost o odhlášení žáka ze studia</a></li>
        <li><a href="https://www.zushm.cz/files/prihlaseni-zaka.doc" className="text-blue-600 hover:text-blue-800 hover:underline">Žádost o přihášení žáka ke studiu</a></li>
        <li><a href="https://www.zushm.cz/files/prohlaseni-zus-covid.docx" className="text-blue-600 hover:text-blue-800 hover:underline">Čestné prohlášení o negativním výsledku na přítomnost viru SARS-CoV-2 (COVID19)</a></li>
        </ul>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Platné předpisy</h2>
        <ul className="space-y-2">
        <li><a href="https://www.zushm.cz/files/skolni_rad/ZUSHM_Skolni_rad.pdf" className="text-blue-600 hover:text-blue-800 hover:underline">Školní řád</a></li>
        <li><a href="https://www.zushm.cz/files/SVP_HM.pdf" className="text-blue-600 hover:text-blue-800 hover:underline">Školní vzdělávací program (ŠVP)</a></li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default Documents;