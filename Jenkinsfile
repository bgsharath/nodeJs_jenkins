pipeline {
    agent any
    
    environment {
        IMAGE_NAME = 'sharathbg/nodejs-jenkins'
        CONTAINER_NAME = 'nodejs-container-jenkins'
        EC2_USER = 'ubuntu'  // Change for Amazon Linux (ec2-user)
        EC2_HOST = '13.203.155.169'
        PATH = "/usr/local/bin:$PATH"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/bgsharath/nodeJs_jenkins.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }
        
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                }
            }
        }
        
        stage('Push Image to Docker Hub') {
            steps {
                sh 'docker push $IMAGE_NAME'
            }
        }
        
        stage('Cleanup') {
            steps {
                sh 'docker rmi $IMAGE_NAME'
            }
        }
        
        stage('Deploy to AWS EC2') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY $EC2_USER@$EC2_HOST "bash -c '
                            echo \"Pulling latest image from Docker Hub...\";
                            sudo docker pull $IMAGE_NAME;
                        
                            echo \"Stopping and removing old container...\";
                            sudo docker stop $CONTAINER_NAME || true;
                            sudo docker rm $CONTAINER_NAME || true;
                        
                            echo \"Running new container...\";
                            sudo docker run -d --name $CONTAINER_NAME -p 3000:3000 --env-file .env $IMAGE_NAME;
                        '"
                        """
                    }
                }
            }
        }
    }
}
