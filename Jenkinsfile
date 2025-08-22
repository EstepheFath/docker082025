pipeline {
    agent any

    options {
        // évite que Jenkins fasse un "lightweight checkout" automatique (souvent source d'erreurs)
        skipDefaultCheckout()
    }

    environment {
        // remplacer 'SonarQube' par l'ID de ton credential de type "Secret text" contenant le token Sonar
        SONAR_TOKEN = credentials('SonarQube')
        // URL de Sonar (depuis un conteneur Docker sur Windows, host.docker.internal pointe vers l'hôte)
        SONAR_HOST = 'http://host.docker.internal:9000'
    }

    tools {
        nodejs 'Node 24'
    }

    stages {
        stage('Clean') {
            steps {
                // vide proprement le workspace avant chaque build
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                // clone complet en utilisant la config SCM du job
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
                script {
                    // Exécute SonarScanner dans un conteneur Docker (nécessite que Jenkins puisse lancer docker)
                    // Le workspace courant est monté dans le conteneur scanner.
                    sh """
                      docker run --rm \
                        -v "\$PWD":/usr/src -w /usr/src \
                        -e SONAR_TOKEN=${SONAR_TOKEN} \
                        sonarsource/sonar-scanner-cli:latest \
                        -D "sonar.projectKey=projet-xyz" \
                        -D "sonar.sources=." \
                        -D "sonar.host.url=${SONAR_HOST}" \
                        -D "sonar.login=${SONAR_TOKEN}"
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    // waitForQualityGate nécessite le plugin SonarQube et idéalement un webhook configuré dans Sonar
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
            // Si tu n'as pas de SMTP configuré, commente/retire ce bloc ou configure un serveur mail dans Jenkins
            mail to: 'ton.email@exemple.com',
                 subject: "Build failed: ${currentBuild.fullDisplayName}",
                 body: "Voir le build Jenkins : ${env.BUILD_URL}"
        }
    }
}
