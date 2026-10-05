pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --runInBand'
            }
        }

        stage('Test Cases') {
            steps {
                sh 'npm test -- --runInBand --testNamePattern="renders|adds|edits|deletes|filters"'
            }
        }
    }
}
