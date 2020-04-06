# File upload/download sample

- S3 Pre-Signed URL support
- Azure SAS support(TBD)

## setup

install aws-cli and initial setting

## install

```
$ git clone https://github.com/tsujimitsu/file-upload-download.git
$ cd file-upload-download
$ npm i
$ cd frontend
$ npm i
```

## running

```
$ S3_BUCKET_NAME=XXX npm start
```

## optional

```
$ export AWS_REGION=ap-northeast-1
$ export S3_PRESIGNED_URL_EXPIRES=60
```

## access

- access to localhost:8080 from Web Browser
- ex. tenantId:abc123 -> http://localhost:8080/abc123

## E2E UI Test

```shell
$ npm run test:ui
```

## E2E API Test

```shell
$ npm run test:api
```

## Reference

- [Postman と Newman を組み合わせて、CI/CD に組み込む REST API の自動テストを作ろう！](https://qiita.com/developer-kikikaikai/items/74cedc67643ca93d2e0b)
