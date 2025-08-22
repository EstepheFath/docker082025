pipeline {
    agent any

    environment {
        // Remplace 'sonar-token-id' par l'ID exact de ton credential de type "Secret Text" dans Jenkins
        SONAR_TOKEN = credentials('sonar-token-id')
    }

    tools {
        // Assure-toi que "Node 24" existe dans Manage Jenkins -> Global Tool Configuration
        nodejs "Node 24"
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

        stage('SonarQube Analysis') {
            steps {
                // Remplace 'sonar-server' par le nom de l'instance SonarQube configurée dans Jenkins (Manage Jenkins -> Configure System -> SonarQube installations)
                withSonarQubeEnv('sonar-server') {
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
