# Simple-AWS-SAM
---

This mini application is created to learn SAM in AWS

---

* The backend folder contains lambdas and JS logic for simple CRUD operations
* The frontend folder contains the minimalist UI for adding, updating, deleting new record in AWS dynamoDB
* The Infrastructure of the AWS is defined in *template.yaml* file as IOC.

---

## Procedure to run template.yaml

⚠️ Make sure you have the AWS CLI configured (aws configure) and the SAM CLI installed before running these commands.

* First configure your aws account using

```bash
aws configure
# this will ask you
# AWS Access Key ID
# AWS secret Access Key
# region
# output format
```

* Then validate the template using

```bash
sam validate
# (optional) you can specify the template explicitly:
# sam validate --template-file template.yaml
```

* Build the application

```bash
sam build
# this processes your functions and dependencies into the .aws-sam/build folder
```

* Deploy to AWS

```bash
sam deploy --guided
# follow prompts to set stack name, region, S3 bucket, etc.
# subsequent deploys can be done simply with:
# sam deploy
```

* Clean up (Optional)

```badh
sam delete  # removes the deployed stack
```

---
Now after the above steps, the infrastructure will be deployed in your configured AWS account
Then via the frontend try using the available features.
---
You can try creating a S3 bucket and host the frontend on your own interest
---

Author <br>
M.Malarvannan <br>
SDE Intern at Trimble Inc. (Feb 2026)

