import React, { useState } from "react";

const Kontakt = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();
    if (data.success) {
      alert("Zpráva byla úspěšně odeslána.");
    } else {
      alert("Došlo k chybě. Zkuste to znovu.");
    }
  };

  return (
    <div>
      <div className="oborImage">
        <img
          src={`${process.env.PUBLIC_URL}/assets/img/calendar.jpg`}
          alt="calendar"
          className="img"
        />
        <h1>Kontakt</h1>
      </div>

      <div className="info-container">
        <h2>Kontaktní údaje</h2>
        <p style={{ fontWeight: "bold" }}>Základní umělecká škola Heřmanův městec</p>
        <p>Jarkovského 47</p>
        <p>538 03 Heřmanův Městec</p>

        <div className="inf">
          <p>IČO:</p>
          <p>691 70 207</p>
        </div>

        <div className="inf">
          <p>IZO:</p>
          <p>117 200 760</p>
        </div>

        <div className="inf">
          <p>email:</p>
          <p>reditel@zushm.cz</p>
        </div>

        <div className="inf">
          <p>Telefonní čísla</p>
          <p>Kancelář: 469 696 291</p>
          <p>Mobil: 739 411 282</p>
        </div>
      </div>

      <div className="contact-container">
        <h1>Vedení školy</h1>
        <h3>MgA. Štěpán Křováček</h3>
        <p>Ředitel školy</p>
        <h3>Miluše Kratochvílová</h3>
        <p>Zástupce ředitele a ekonom</p>
        <h3>Lukáš Kyncl</h3>
        <p>Zástupce ředitele</p>
      </div>

      {/* Kontakt Formulář */}
      <div className="contact-form">
        <h2>Napište nám zprávu</h2>
        {ok && <p style={{ color: "green" }}>Zpráva byla úspěšně odeslána.</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Jméno *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email (nepovinný)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Zpráva *</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Odesílání..." : "Odeslat zprávu"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Kontakt;
