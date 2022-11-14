INSERT INTO users (name, email) 
VALUES ('John', 'john@yahoo.com'), ('Mary', mary@beck.com');


psql --host=<servername> --port=<port> --username=<user> --dbname=<dbname>

psql '--host=soy-crc-db-server.postgres.database.azure.com' '--port=5432' '--dbname=crc-store' '--username=efgarro' '--set=sslmode=require'