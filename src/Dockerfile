FROM maven:3.8.7 as build
WORKDIR /app
COPY . .
RUN mvn package -DskipTest
