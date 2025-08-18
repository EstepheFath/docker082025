# ===== Stage DEV (optionnel pour dev) =====
FROM node:20-alpine AS dev
WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm ci

# Copier le code source
COPY . .

# Servir l'application en mode développement (hot reload)
ENV CHOKIDAR_USEPOLLING=1
EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

# ===== Stage BUILD =====
FROM node:20-alpine AS build
WORKDIR /app

# Copier les fichiers de dépendances et installer
COPY package*.json ./
RUN npm ci

# Copier le reste du code et builder Angular
COPY . .
RUN npx ng build --configuration=production --output-path=/app/dist

# ===== Stage FINAL avec Nginx =====
FROM nginx:alpine
# Copier les fichiers buildés dans le dossier Nginx
COPY --from=build /app/dist/ /usr/share/nginx/html

# Exposer le port HTTP
EXPOSE 80

# Lancer Nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]
