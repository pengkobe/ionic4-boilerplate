pipeline {

    agent any

    stages {

        stage('NPM Setup') {
            steps {
               sh 'npm install'
            }
        }

        stage('Stage Web Test') {
            steps {
                sh 'npm run Test'
            }
       }

       stage('Stage Web Build') {
            steps {
                sh 'npm run build --prod'
            }
       }

       stage('Android Build') {
            steps {
                sh 'ionic cordova build android --release'
            }
       }

      
    }
}