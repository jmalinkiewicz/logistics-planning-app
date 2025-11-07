# Use a base image with JDK
FROM gradle:8.5-jdk21 AS builder

WORKDIR /app

# Copy Gradle build files
COPY build.gradle.kts settings.gradle.kts ./
COPY gradle gradle
COPY gradlew gradlew.bat ./

# Copy source
COPY src ./src

# Build the app (skip tests for speed)
RUN ./gradlew build -x test

# ---- Runtime image ----
FROM amazoncorretto:23-alpine-jdk

WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]