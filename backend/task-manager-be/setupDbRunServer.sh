#!/bin/bash

psql -U postgres -c "CREATE DATABASE taskManagerDb;"
psql -U postgres -c "CREATE USER db_korisnik WITH PASSWORD 'nekaJakaSifra';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE taskManagerDb to db_korisnik;"
psql -U postgres -c "ALTER USER db_korisnik CREATEDB;"

echo "\q" | psql

npx prisma db pull
npx prisma migrate dev
npm run dev