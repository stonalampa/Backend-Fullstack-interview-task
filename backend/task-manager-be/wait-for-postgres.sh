#!/bin/sh

# Function to check if PostgreSQL is ready
wait_for_postgres() {
  until psql -h postgres -U postgres -c "SELECT 1" &>/dev/null; do
    echo "Waiting for PostgreSQL to be ready..."
    sleep 1
  done
  echo "PostgreSQL is ready!"
}

# Wait for PostgreSQL and then execute the provided command
wait_for_postgres
exec "${@}"
