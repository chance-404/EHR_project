# Build
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Build the JAR
COPY src ./src
RUN mvn clean package -DskipTests

# Run
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy the JAR 
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Memory limits for 2GB VPS
ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]



