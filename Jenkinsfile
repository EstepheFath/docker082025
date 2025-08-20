pipeline {
    agent any

    stages {
        stage('Build Frontend') {
            steps {
                dir('/workspace') {
                    sh 'docker-compose -f /workspace/docker-compose.yaml -f /workspace/docker-compose.ci.yaml build frontend'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('/workspace') {
                    sh 'docker-compose -f docker-compose.yaml -f docker-compose.ci.yaml run --rm frontend npm test'
                }
            }
        }
    }
}
