
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
RUN npm run build
CMD ["npm", "run", "dev"]
