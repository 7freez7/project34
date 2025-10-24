import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-left">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2567.4744235611806!2d15.66788637625593!3d49.94620237150023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470c4aa7e44cc827%3A0x9a57a286c3e3fb43!2zWlXFoCBIZcWZbWFuxa92IE3Em3N0ZWM!5e0!3m2!1scs!2scz!4v1731352605152!5m2!1scs!2scz"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="footer-right">
          <h2 style={{ textAlign: "left" }}>Kontakt</h2>
          <h4>
            Adresa:{" "}
            <a
              href="https://maps.app.goo.gl/wqRMugnb7fqzdG1PA"
              target="_blank"
              style={{ color: "#f0f0f0" }}
            >
              <p>Palackého 67, 538 03 Praha</p>
            </a>
          </h4>
          <h4>Telefon:</h4>
          <p>123 456 678 | 469 696 691</p>
          <h4>Email:</h4>
          <p>email@gmail.cz</p>
          <h4>Pracovní doba: </h4>
          <p>Po - Pá 09:00 - 17:00</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
