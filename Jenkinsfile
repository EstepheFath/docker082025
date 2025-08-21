pipeline {
    agent any

    environment {
        SONARQUBE = 'sonar-server' // nom du serveur SonarQube dans Jenkins
        SONAR_TOKEN = credentials('sonar-token-id') // ton token Sonar enregistré dans Jenkins
    }

    tools {
            nodejs "Node 24" // le nom que tu as donné dans la config globale
        }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/EstepheFath/docker082025.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }


        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('jenkins_sonar') {
                    sh 'sonar-scanner -Dsonar.projectKey=projet-xyz -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=$SONAR_TOKEN'
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
