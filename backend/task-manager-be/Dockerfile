FROM node:20

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

# Set the working directory inside the container
WORKDIR /app

# Copy your application files into the container
COPY . .

# Install dependencies
RUN npm install

# Copy the custom wait script
COPY wait-for-postgres.sh /app/wait-for-postgres.sh
RUN chmod +x /app/wait-for-postgres.sh

# Copy the setup script
COPY setupDbRunServer.sh /app/setupDbRunServer.sh
RUN chmod +x /app/setupDbRunServer.sh

# Expose the port your Express.js server will run on
EXPOSE 3000

# Use the custom wait script to wait for PostgreSQL and then run your setupDbRunServer script
CMD ["./wait-for-postgres.sh", "./setupDbRunServer.sh"]
