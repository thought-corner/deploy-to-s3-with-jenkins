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
            steps {
                // 강좌 방식: 키 한 쌍을 usernamePassword credential 하나로 묶어 주입
                // username=Access key ID, password=Secret access key
                // 버킷 이름은 Secret text(string)로 함께 주입
                withCredentials([
                    usernamePassword(credentialsId: 'my-aws',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'),
                    string(credentialsId: 's3-bucket-name', variable: 'S3_BUCKET')
                ]) {
                    sh '''
                        aws --version
                        # site 폴더의 정적 파일을 S3 버킷으로 동기화 (--delete: 버킷의 옛 파일 제거)
                        aws s3 sync ./site "s3://$S3_BUCKET" --delete
                        # 배포 결과 확인 (그 버킷 안 파일 목록 — 최소권한으로도 동작)
                        aws s3 ls "s3://$S3_BUCKET" --recursive
                    '''
                }
            }
        }
    }
}
