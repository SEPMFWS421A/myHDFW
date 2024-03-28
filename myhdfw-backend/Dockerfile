
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build-stage
COPY . /app
WORKDIR /app
RUN mvn -B package --file pom.xml -P skip-test


FROM eclipse-temurin:17-jre-alpine AS production-stage
COPY --from=build-stage /app/target/*.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]