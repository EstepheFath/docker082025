pipeline {
    agent any

    tools {
        nodejs 'Node 24'
    }

    stages {
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
                sh '''
                  sonar-scanner \
                  -Dsonar.projectKey=projet-xyz \
                  -Dsonar.sources=. \
                  -Dsonar.host.url=http://host.docker.internal:9000 \
                  -Dsonar.login=$SONAR_TOKEN
                '''
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
    }
}
