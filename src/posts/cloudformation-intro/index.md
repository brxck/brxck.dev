---
title: Brief Intro to CloudFormation
date: 2021-05-20
tags: [AWS, CloudFormation, Web]
draft: false
toc: true
---

This post is adapted from a quick-start guide I wrote for our infrastructure team. I wrote this because the CloudFormation docs, though well-written and thorough, are hardly digestible as a newcomer.

---

This is an introduction to [CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html). This is meant to be a quick intro and reference; for more detail, headers are links to the CloudFormation docs.

CloudFormation allows us to describe and deploy all the resources and configuration needed for an application in a single file called a _template_. A template is deployed to create a _stack_ of resources.

- A version controlled template means version controlled configuration of our infrastructure
- One template can deploy multiple stacks/environments
- Stacks describe what resources are related and let us provision, update, and teardown
- Each deployment yields _outputs_ which can be used to parameterize other processes

> #### Stack Drift
>
> That last point means that stack resources should only be configured through templates. Changes outside the template lead to "stack drift". AWS can help detect drift for some resources.

In the CloudFormation console you can view a list of stacks and their templates, history, resources, and outputs.

## [Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-guide.html)

Templates can be in yaml or json. We'll use yaml here for the sake of readabiity. All of the AWS documentation comes with examples in both formats. You can easily convert between the two using the `cfn-flip` [utility](https://github.com/awslabs/aws-cfn-template-flip).

The main components of a template:

### [Parameters](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html)

Inputs that are specified at the time of deployment. They can have descriptions and constraints:

```yaml
Parameters:
  AppSlug:
    Type: String
    AllowedPattern: ^[\w\s+=,.@-]+$
    ConstraintDescription: must be a valid name for a Cognito client.
    Description: Display name of the application.
  Environment:
    Type: String
    AllowedPattern: (prod|stage|dev|review.*)
    Description: Name of the environment.
```

To define them at deploy-time, use the (oddly-named) `--parameter-overrides` [argument](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/deploy/index.html).

```shell{4}
aws cloudformation deploy
  --template-file packaged.yaml
  --stack-name myapp-prod
  --parameter-overrides AppSlug=myapp Environment=prod
  --capabilities CAPABILITY_IAM
```

### [Resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html)

A list of AWS resources to provision/configure as the stack.

For each resource declare its name `WebsiteBucket`, type `AWS::S3::Bucket`, and how it should be configured. You must check the [resource reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) to know what a resource's properties can be!

```yaml
WebsiteBucket:
  Type: AWS::S3::Bucket
  Properties:
    BucketName: !Sub
      - app-${AppSlug}-${Environment}
      - AppSlug: !Ref 'AppSlug'
        Environment: !Ref 'Environment'
    AccessControl: PublicRead
    WebsiteConfiguration:
      IndexDocument: index.html
      ErrorDocument: 404.html
    Tags:
      - Key: application
        Value: !Ref 'AppSlug'
      - Key: environment
        Value: !Ref 'Environment'
```

Let's break down some of the other things that are going on in this little chunk of template. Here we can see our parameters come into play. We are able to reference them using...

### [Intrinsic Functions](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html)

Again with the smooth Amazon naming. These are just ways to inject some dynamic behavior into our templates. Let's look at a few of them.

#### [!Ref](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html)

`!Ref` returns the value of a parameter or resource. To know what you can get out of a resource, you need to check its Ref return value in the [resource reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html).

In the case of a [S3 Bucket](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#aws-properties-s3-bucket-return-values), we would get back the bucket name.

Other times, we just want to refer to one of our parameters:

```yaml{3}
Outputs:
  BucketName:
    Value: !Ref WebsiteBucket # -> app-myapp-prod
  WebsiteDomain:
    Value: !GetAtt WebsiteCloudfront.DomainName
```

#### [!GetAtt](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html)

If we want to get back other information about the bucket, we can instead use `!GetAtt` to get one of the other resource's [return values](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#aws-properties-s3-bucket-return-values):

```yaml{5}
Outputs:
  BucketName:
    Value: !Ref WebsiteBucket
  WebsiteDomain:
    Value: !GetAtt WebsiteCloudfront.DomainName
      # -> app-myapp-prod-kdwwxmddtr2g.s3.amazonaws.com
```

#### [!Sub](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html)

This function let us substitute values into a string. It takes an array: the first member is the string, and the second member is the map of key/values to substitute. We have to use `!Ref` inside of `!Sub` to pull in our parameters.

```yaml{4-7}
WebsiteBucket:
  Type: AWS::S3::Bucket
  Properties:
    BucketName: !Sub
      - app-${AppSlug}-${Environment}
      - AppSlug: !Ref 'AppSlug'
        Environment: !Ref 'Environment'
      # -> app-myapp-prod
```

> #### Prefer `!Sub` over `!Join`
>
> Often people use `!Join` for this kind of thing; however, I think `!Sub` leads to a more readable template.

### [Outputs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html)

Key/value pairs which indicate important values of the stack's resources. These are pretty straightforward; we grab values from our resources using `!Ref` or `!GetAtt` and assign names to them.

```yaml
Outputs:
  BucketName:
    Value: !Ref WebsiteBucket
  WebsiteDomain:
    Value: !GetAtt WebsiteCloudfront.DomainName
  CognitoClientId:
    Value: !Ref WebsiteCognitoClient
```

These are especially useful because they can be used as parameters for parts of the deployment process handled outside of CloudFormation!

## [Deployment](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/deploy/index.html)

Deploying a template is pretty straightforward, and it will usually happen in CI using the [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/index.html).

If we need to deploy code along with our template (like for a Lambda function) we must package it as an artifact and upload it to a bucket. The `package` [command](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-cli-package.html) will find the code referenced in the template and do just that:

```shell
aws cloudformation package
  --template-file template.yaml
  --s3-bucket cf-templates-36sbt3jod97u-us-west-2
  --output-template-file packaged.yaml
```

This outputs another template that we can then deploy. If no artifacts need to be packaged, we can just deploy the original template directly.

```shell
aws cloudformation deploy
  --template-file packaged.yaml
  --stack-name myapp-prod
  --capabilities CAPABILITY_IAM
  --parameter-overrides AppSlug=myapp Environment=prod
```

## Deletion

Stacks can be deleted end all resources will be torn down, unless the template specifically says to retain them.

> #### Deleting S3 Buckets
>
> Unless [otherwise configured](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html), S3 Buckets must be emptied before their stack is deleted! Trying to delete a non-empty bucket will cause the entire operation to fail.
