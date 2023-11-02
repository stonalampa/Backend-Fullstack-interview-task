FROM node:20
RUN apt-get update && apt-get install -y postgresql-client
WORKDIR /app
COPY . .
RUN npm install
COPY wait-for-postgres.sh /app/wait-for-postgres.sh
RUN chmod +x /app/wait-for-postgres.sh
COPY setupDbRunServer.sh /app/setupDbRunServer.sh
RUN chmod +x /app/setupDbRunServer.sh
EXPOSE 3000
CMD ["./wait-for-postgres.sh", "./setupDbRunServer.sh"]
