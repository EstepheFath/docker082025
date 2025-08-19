# Stage de build
FROM node:20-alpine AS build
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer toutes les dépendances (dev.ps1 + prod)
RUN npm ci

# Copier le code source
COPY . .

# Compiler le projet NestJS
RUN npm run build

# Stage final
FROM node:20-alpine
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --only=production

# Copier le code compilé depuis le build
COPY --from=build /app/dist ./dist

# Variables d'environnement
ENV NODE_ENV=production
EXPOSE 3000

# Démarrage de l'application
CMD ["node", "dist/main.js"]
