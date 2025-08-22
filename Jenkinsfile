pipeline {
  agent any

  environment {
    // Récupère le token depuis les Credentials Jenkins (ID = 'SonarQube')
    SONAR_TOKEN = credentials('SonarQube')
    SONAR_HOST_URL = 'http://host.docker.internal:9000'
  }

  tools {
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
        // Utilise le SonarScanner installé (ou dispo dans PATH)
        sh '''
          sonar-scanner \
            -Dsonar.projectKey=projet-xyz \
            -Dsonar.sources=. \
            -Dsonar.host.url=${SONAR_HOST_URL} \
            -Dsonar.login=${SONAR_TOKEN}
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
    failure {
      // Désactive provisoirement si pas de SMTP
      // mail to: 'ton.email@exemple.com',
      //      subject: "Build failed: ${currentBuild.fullDisplayName}",
      //      body: "Voir le build Jenkins : ${env.BUILD_URL}"
      echo 'Build failed (mail disabled)'
    }
  }
}
