#!/bin/sh

wait_for_postgres() {
  until psql -h postgres -U postgres -c "SELECT 1" &>/dev/null; do
    echo "Waiting for PostgreSQL to be ready..."
    sleep 1
  done
  echo "PostgreSQL is ready!"
}

wait_for_postgres
exec "${@}"
