pipeline {
    // Define el pipeline principal de Jenkins.
    agent any

    tools {
        // Indica que se usará Node.js para ejecutar los comandos del pipeline.
        nodejs 'Node' //Nombre configurado en Jenkins
    }

    stages {
        // Descarga el código del repositorio antes de ejecutar cualquier tarea.
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // Instala las dependencias del proyecto y los componentes necesarios de Playwright.
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Check node version'){
            steps{
                sh 'node -v'
                sh 'npm -v'
                sh 'cat package-lock.json | grep -A2 "@emnapi/core"'
            }
        }

        // Ejecuta las pruebas automatizadas de Playwright.
        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        // Se ejecuta siempre, aunque las pruebas pasen o fallen.
        always {
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }

        // Muestra un mensaje si alguna prueba falla.
        failure {
            echo 'Las pruebas de Playwright han fallado.'
        }
    }
}