## AWS CLI

### To List AWS Profiles

```aws configure list-profiles```

### To Login to AWS Profile

```aws sso login --profile PROFILE_NAME```

## AWS CDK Backend

### To Bootstrap

```cd backend/ && npm run bootstrap -- --profile PROFILE_NAME```

### To Deploy

```cd backend/ && npm run deploy -- --profile PROFILE_NAME```

### To Get AWS API Key

```aws apigateway get-api-key --api-key API_KEY_ID --include-value --profile PROFILE_NAME```
