pipeline {
    agent any

    options {
        skipDefaultCheckout()
    }

    environment {
        // ID du credential Secret text contenant ton token Sonar (crée-le si pas encore)
        SONAR_TOKEN = credentials('SonarQube')
        SONAR_HOST = 'http://host.docker.internal:9000'
    }

    tools {
        nodejs 'Node 24'
    }

    stages {
        stage('Clean') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
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

        stage('SonarQube Analysis') {
            steps {
                // withCredentials masque le secret dans la sortie Jenkins
                withCredentials([string(credentialsId: 'SonarQube', variable: 'SONAR_TOKEN')]) {
                    sh '''#!/bin/bash
                      set -e
                      sonar-scanner \
                        -D "sonar.projectKey=projet-xyz" \
                        -D "sonar.sources=." \
                        -D "sonar.host.url=${SONAR_HOST}" \
                        -D "sonar.login=$SONAR_TOKEN"
                    '''
                }
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
        failure {
            mail to: 'ton.email@exemple.com',
                 subject: "Build failed: ${currentBuild.fullDisplayName}",
                 body: "Voir le build Jenkins : ${env.BUILD_URL}"
        }
    }
}
