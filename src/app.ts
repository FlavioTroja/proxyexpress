import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware per il parsing del corpo JSON
app.use(express.json());

// Gestisci le richieste POST in arrivo
app.post('/proxy', async (req, res) => {
  try {
    const body = req.body;

    const credentials = body.remoteUsername && Buffer.from(`${body.remoteUsername}:${body.remotePassword}`).toString('base64');
    // Esegui la richiesta al server SOAP esterno
    const response = await axios({
      method: body.remoteMethod,
      url: body.remoteUrl,
      timeout: 4000,    // 4 seconds timeout
      data: body.remoteBody,
      headers: {
        "Accept": "application/xml",
        "Content-Type": "application/xml",
        "Authorization": credentials && `Basic ${credentials}`,
      },
    });
    // Imposta l'intestazione della risposta come XML
    res.set('Content-Type', 'application/xml');
    // Invia il documento XML come risposta
    res.send(response.data);
  } catch (error) {
    console.error('Errore proxy:', error);
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Server proxy in esecuzione sulla porta ${PORT}`);
});
