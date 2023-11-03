# Usa l'immagine di Linux Alpine come base
FROM node:21-alpine3.17

# Crea una directory di lavoro nell'immagine Docker
WORKDIR /app

# Copia il file package.json e package-lock.json nella directory di lavoro
COPY package*.json ./

# Installa le dipendenze del progetto
RUN npm install

# Copia il file .env nell'immagine Docker
COPY .env.local ./.env

# Copia il codice sorgente dell'app nell'immagine Docker
COPY . .

# Esponi la porta su cui l'app Node.js ascolterà (assicurati che corrisponda alla porta in package.json o nel tuo codice)
EXPOSE 5000

# Avvia l'app Node.js
CMD ["npm", "start"]
