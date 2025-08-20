pipeline {
    agent any

    tools {
        nodejs "Node_24"   // doit correspondre au nom configuré dans Jenkins → Manage Jenkins > Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Spocsk/BibliFlow'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker-compose -f docker-compose.yaml -f docker-compose.ci.yaml build frontend'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'docker-compose -f docker-compose.yaml -f docker-compose.ci.yaml run --rm frontend npm run test:ci'
            }
        }
    }
}
