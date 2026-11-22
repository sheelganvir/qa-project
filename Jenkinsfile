pipeline {
    agent any

    environment {
        // Jenkins on Mac often can't find node/npm, so we add Homebrew's path
        PATH = "/Users/sheel/.nvm/versions/node/v24.22.0/bin/:${env.PATH}"
    }

    parameters {
        choice(name: 'SUITE', choices: ['sanity', 'regression', 'all'], description: 'Which tests to run')
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install chromium'
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    if (params.SUITE == 'sanity') {
                        sh 'npm run test:sanity'
                    } else if (params.SUITE == 'regression') {
                        sh 'npm run test:regression'
                    } else {
                        sh 'npm test'
                    }
                }
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'results.xml'
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}