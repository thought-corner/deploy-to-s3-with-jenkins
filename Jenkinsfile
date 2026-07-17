pipeline {
    // 전역 에이전트 미사용 (컨테이너 중첩 방지)
    agent none

    environment {
        AWS_DEFAULT_REGION = 'ap-northeast-2'   // 서울
    }

    stages {
        stage('Deploy S3') {
            agent {
                docker {
                    image 'amazon/aws-cli'
                    // aws-cli 이미지는 실행 후 바로 종료되므로 엔트리포인트 무력화
                    args "--entrypoint=''"
                }
            }
            environment {
                AWS_ACCESS_KEY_ID     = credentials('aws-access-key-id')
                AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
                // 버킷 이름도 코드에 박지 않고 Jenkins credential(Secret text)로 주입
                S3_BUCKET             = credentials('s3-bucket-name')
            }
            steps {
                sh '''
                    aws --version
                    # site 폴더의 정적 파일을 S3 버킷으로 동기화 (--delete: 버킷의 옛 파일 제거)
                    aws s3 sync ./site "s3://$S3_BUCKET" --delete
                '''
            }
        }
    }
}
