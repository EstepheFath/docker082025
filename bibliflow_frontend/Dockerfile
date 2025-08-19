# ===== Stage BUILD =====
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Builder Angular en production
RUN npx ng build --configuration=production --output-path=/app/dist/bibliflow_frontend

# ===== Stage FINAL avec Nginx =====
FROM nginx:alpine AS final
# Copier le build Angular correct (browser)
COPY --from=build /app/dist/bibliflow_frontend/browser/ /usr/share/nginx/html

# Copier fichier config Nginx si nécessaire
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
