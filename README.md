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
```

## running

```
$ S3_BUCKET_NAME=XXX npm start
```

## optional

```
$ export AWS_REGION=ap-northeast-1
$ export S3_PRESIGNED_URL_EXPIRES=60
$ export S3_BUCKET_NAME=XXX
$ npm start
```

## access

- access to localhost:8080 from Web Browser
- ex. tenantId:abc123 -> http://localhost:8080/abc123
