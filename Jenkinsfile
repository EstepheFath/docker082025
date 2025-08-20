pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Frontend') {
      steps {
        dir('/workspace') {
          // build uniquement le frontend (ajuste --parallel si tu veux)
          sh 'docker-compose -f /workspace/docker-compose.yaml -f /workspace/docker-compose.ci.yaml build --parallel frontend'
        }
      }
    }

    stage('Optional: Build Backend') {
      steps {
        dir('/workspace') {
          // décommente si tu veux builder backend aussi
          // sh 'docker-compose -f /workspace/docker-compose.yaml -f /workspace/docker-compose.ci.yaml build backend'
          echo 'Backend build skipped (comment/uncomment the command if needed)'
        }
      }
    }
  }

  post {
    always {
      dir('/workspace') {
        // tidy up optional: supprime containers créés par erreur (safe)
        sh 'docker-compose -f /workspace/docker-compose.yaml -f /workspace/docker-compose.ci.yaml down --remove-orphans || true'
      }
    }
  }
}
