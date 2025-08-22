pipeline {
    agent any

    tools {
        // Vérifie que 'Node 24' existe dans Manage Jenkins -> Global Tool Configuration
        nodejs 'Node 24'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/EstepheFath/docker082025.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('bibliflow_backend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('bibliflow_frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('SonarQube') {
            steps {
                script {
                    sh '''
                        docker run --rm \
                          -v $(pwd):/usr/src \
                          -w /usr/src \
                          sonarsource/sonar-scanner-cli:latest \
                          -Dsonar.projectKey=projet-xyz \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=http://sonarqube:9000 \
                          -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    // attend le résultat du Quality Gate (nécessite le plugin SonarQube)
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
        failure {
            mail to: 'ton.email@exemple.com',
                 subject: "Build failed: ${currentBuild.fullDisplayName}",
                 body: "Voir le build Jenkins : ${env.BUILD_URL}"
        }
    }
}
