FROM mysql:8.0.31
RUN chmod -R 775 /docker-entrypoint-initdb.d
COPY startupdb.sql /docker-entrypoint-initdb.d/