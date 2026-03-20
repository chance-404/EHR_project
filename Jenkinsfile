pipeline {
    agent any

	environment {
        // Limits Maven's memory usage during the build
        MAVEN_OPTS = "-Xmx256m"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy Backend') {
            steps {
                dir('backend') {
                    script {
                        // Build the JDK 21 image
                        sh "docker build -t ehr-backend ."
                        
                        // Stop and rm old container
                        sh "docker stop ehr-backend || true"
                        sh "docker rm ehr-backend || true"
                        
                        // Start with host-gateway to reach Postgres
                        sh """
                        docker run -d \
                          --name ehr-backend \
                          -p 8080:8080 \
                          --add-host=host.docker.internal:host-gateway \
                          ehr-backend
                        """
                    }
                }
            }
        }

        stage('Build & Deploy Frontend') {
            steps {
                dir('frontend') {
                    script {
                        sh "docker build -t ehr-frontend ."
                        sh "docker stop ehr-frontend || true"
                        sh "docker rm ehr-frontend || true"
                        
                        // Run on 8082 to avoid clashing with Nginx/Spring Boot
                        sh "docker run -d --name ehr-frontend -p 8082:80 ehr-frontend"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful'
        }
        always {
            // Important on small VPS instance to prevent disk bloat
            sh "docker image prune -f"
        }
    }
}