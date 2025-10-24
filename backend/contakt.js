const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Vyplňte všechna pole.' });
  }

  try {
    // Nastavení odesílatele (můžeš dát svůj školní email, Gmail, Seznam apod.)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Pokud máš jiný email, dám ti jinou konfiguraci
      auth: {
        user: 'filaa.07cz@gmail.com',
        pass: 'Heslo1234.'
      }
    });

    const mailOptions = {
      from: email,
      to: 'filaa.07cz@gmail.com',
      subject: `Nová zpráva z kontaktního formuláře od: ${name}`,
      text: `Jméno: ${name}\nEmail: ${email}\n\nZpráva:\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Zpráva byla odeslána.' });
  } catch (error) {
    console.error('Chyba při odesílání emailu:', error);
    res.status(500).json({ error: 'Nepodařilo se odeslat email.' });
  }
});

module.exports = router;
