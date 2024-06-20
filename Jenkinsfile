pipeline {
    agent any
    stages {
        stage('Welcome to Jenkin Pipeline - Playwright') {
            steps {
                echo 'Welcome to Jenkin Pipeline - Playwright'
            }
        }
        
        stage('Get code') {
            steps {
                git branch: 'main', url:'https://github.com/donguyenthienan/playwright_sdetpro.git'
            }
        }
        stage('Install lib') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Run test') {
            steps {
                bat 'npm run test'
            }
        }
        
        stage('Publish HTML Report') {
            steps {
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: './my-report', // Directory containing the report
                    reportFiles: 'index.html', // The main HTML file of the report
                    reportName: 'Playwright HTML Report',
                    reportTitles: 'Test Results'
                ])
            }
        }
    }
}