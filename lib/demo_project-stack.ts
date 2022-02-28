import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as Lambda from  "aws-cdk-lib/aws-lambda";
import *  as DynamoDB from "aws-cdk-lib/aws-dynamodb"
import *  as Apigateway from "aws-cdk-lib/aws-apigateway"

const path = require("path");


export class DemoProjectStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

     // resource name variables
     const tableName:string = "DemoTable";

     // The code that defines your stack goes here
    const table = new DynamoDB.Table(this,"demo-table",{
         partitionKey:{name:"PK",type:DynamoDB.AttributeType.STRING},
         sortKey:{name:"SK",type:DynamoDB.AttributeType.STRING},
         tableName:tableName,
     });

     const demoFunction = new Lambda.Function(this,"demo-function",{
        functionName:"demo-function",
        runtime:Lambda.Runtime.NODEJS_14_X,
        code:Lambda.Code.fromAsset("Lambda/demo-function"),
        handler:"index.handler",
        environment: {
          'demo_table_name': table.tableName,
        },
     })

     table.grantReadWriteData(demoFunction);


     const api = new Apigateway.LambdaRestApi(this,"demo-api",{
       proxy:false,
       handler:demoFunction
     })

     api.root.addMethod("POST");

 
  }
}
