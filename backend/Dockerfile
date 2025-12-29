FROM node:18-alpine
# Instalar dependencias del sistema para Strapi
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "develop"]