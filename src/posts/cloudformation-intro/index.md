---
title: Brief into to CloudFormation
date: 2021-05-20
tags: [AWS, CloudFormation, Web]
draft: true
---

> Headers will link to the relevant AWS documentation.

This is an introduction to [CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html), which lets us describe and deploy all the resources and configuration needed for an application in a single file called a template.

- A version controlled template means version controlled configuration of serverless resources!
- You can deploy multiple stacks from the same template: boom, multiple environments
- Stacks describe what resources are related to each other and let us provision, update, and teardown easily

<!-- prettier-ignore -->
!!! warning "Stack Drift"
    That last point means that stack resources should only be configured through templates! No manual tweaking in the console. Changes outside the template are called "stack drift", and AWS can help detect drift for some resources.

In the CloudFormation console you can view a list of all our stacks, the templates they were created from, a history of their changes, all the resources they manage, and the outputs from their deployment.

## [Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-guide.html)

Templates can be in yaml or json. Prefer yaml because more human readable. All of the AWS documentation comes with examples in both formats. You can easily convert between the two using the `cfn-flip` utility.

Main components of a template:

### [Parameters](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html)

Inputs to a template that are specified at the time of deployment. They are defined in the template, and can have constraints:

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

To define them and deploy use the weirdly named [`--parameter-overrides` argument](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/deploy/index.html).

```
aws cloudformation deploy ... --parameter-overrides AppSlug=doggo Environment=prod
```

### [Resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resources-section-structure.html)

A list of resources in the stack to provision/configure.

For each resource you declare its name (`WebsiteBucket`), type (`AWS::S3::Bucket`), and how it should be configured. You must check the [resource reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) to know what a resource's properties can be!

```yaml
WebsiteBucket:
  Type: AWS::S3::Bucket
  Properties:
    BucketName: !Sub
      - fnsv-app-${AppSlug}-${Environment}
      - AppSlug: !Ref "AppSlug"
        Environment: !Ref "Environment"
    AccessControl: PublicRead
    WebsiteConfiguration:
      IndexDocument: index.html
      ErrorDocument: 404.html
    Tags:
      - Key: application
        Value: !Ref "AppSlug"
      - Key: environment
        Value: !Ref "Environment"
```

Let's break down some of the other things that are going on in this little chunk of template. Here we can see our parameters come into play! We are able to reference them using...

### ["Intrinsic Functions"](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html)

At least that is what they decided to call them. These are just ways to inject some dynamic behavior into our templates.

#### [!Ref](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html)

`!Ref` returns the value of a parameter or resource. To know what you can get out of a resource, you need to check its outputs in the [resource reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html).

In the case of a [S3 Bucket](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#aws-properties-s3-bucket-return-values), we would get back the bucket name.

More often, we just want to refer to one of our parameters:

```yaml
!Ref AppSlug # -> doggo
!Ref Environment # -> prod
!Ref WebsiteBucket # -> fnsv-app-doggo-prod
```

#### [!GetAtt](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html)

If we want to get back other information about the bucket, we can instead use `!GetAtt` to get one of the other resource's [return values](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#aws-properties-s3-bucket-return-values):

```yaml
!GetAtt WebsiteCloudfront.DomainName # -> fnsv-app-doggo-prod-kdwwxmddtr2g.s3.amazonaws.com
```

#### [!Sub](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html)

This function just let us substitute values into a string. It takes an array: the first member is the string, and the second member is the map of key/values to substitute. We have to use `!Ref` inside of `!Sub` to pull in our parameters.

```yaml
!Sub
- fnsv-app-${AppSlug}-${Environment}
- AppSlug: !Ref "AppSlug"
  Environment: !Ref "Environment"
# -> fnsv-app-doggo-prod
```

<!-- prettier-ignore -->
!!! Info "Avoid !Join"
    You will see a lot of people use `!Join` for this kind of thing. I think that is stupid; please use `!Sub` for a more readable result.

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

These are especially important because they can be used as parameters for parts of the deployment process handled outside of CloudFormation! We are using Outputs to parameterize the build process of our Vue apps, so that they know which API to hit.

## Deployment

So what does this look like in practice? It's pretty breezy. In the pipelines we just use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/index.html).

If we need to deploy code along with our template (like for a lambda function) we must package it as an artifact in upload it to a bucket. [The `package` command](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-cli-package.html) will find the code referenced in the template and do just that:

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
  --stack-name doggo-prod
  --capabilities CAPABILITY_IAM
  --parameter-overrides AppSlug=doggo Environment=prod
```

Stacks can be deleted end all resources will be torn down, unless the template specifically says to retain them.

<!-- prettier-ignore -->
!!! Warning "Deleting S3 Buckets"
    S3 Buckets must be emptied before their stack is deleted! Trying to delete a non-empty bucket will cause the entire operation to fail.
