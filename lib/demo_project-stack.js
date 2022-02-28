"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoProjectStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const Lambda = require("aws-cdk-lib/aws-lambda");
const DynamoDB = require("aws-cdk-lib/aws-dynamodb");
const Apigateway = require("aws-cdk-lib/aws-apigateway");
const path = require("path");
class DemoProjectStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // resource name variables
        const tableName = "DemoTable";
        // The code that defines your stack goes here
        const table = new DynamoDB.Table(this, "demo-table", {
            partitionKey: { name: "PK", type: DynamoDB.AttributeType.STRING },
            sortKey: { name: "SK", type: DynamoDB.AttributeType.STRING },
            tableName: tableName,
        });
        const demoFunction = new Lambda.Function(this, "demo-function", {
            functionName: "demo-function",
            runtime: Lambda.Runtime.NODEJS_14_X,
            code: Lambda.Code.fromAsset("Lambda/demo-function"),
            handler: "index.handler",
            environment: {
                'demo_table_name': table.tableName,
            },
        });
        table.grantReadWriteData(demoFunction);
        const api = new Apigateway.LambdaRestApi(this, "demo-api", {
            proxy: false,
            handler: demoFunction
        });
        api.root.addMethod("POST");
    }
}
exports.DemoProjectStack = DemoProjectStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtb19wcm9qZWN0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVtb19wcm9qZWN0LXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFnRDtBQUVoRCxpREFBa0Q7QUFDbEQscURBQXFEO0FBQ3JELHlEQUF5RDtBQUV6RCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHN0IsTUFBYSxnQkFBaUIsU0FBUSxtQkFBSztJQUN6QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXZCLDBCQUEwQjtRQUMxQixNQUFNLFNBQVMsR0FBVSxXQUFXLENBQUM7UUFFckMsNkNBQTZDO1FBQzlDLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDO1lBQzlDLFlBQVksRUFBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFDO1lBQzNELE9BQU8sRUFBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFDO1lBQ3RELFNBQVMsRUFBQyxTQUFTO1NBQ3RCLENBQUMsQ0FBQztRQUVILE1BQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsZUFBZSxFQUFDO1lBQzNELFlBQVksRUFBQyxlQUFlO1lBQzVCLE9BQU8sRUFBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbEMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDO1lBQ2xELE9BQU8sRUFBQyxlQUFlO1lBQ3ZCLFdBQVcsRUFBRTtnQkFDWCxpQkFBaUIsRUFBRSxLQUFLLENBQUMsU0FBUzthQUNuQztTQUNILENBQUMsQ0FBQTtRQUVGLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUd2QyxNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQztZQUN2RCxLQUFLLEVBQUMsS0FBSztZQUNYLE9BQU8sRUFBQyxZQUFZO1NBQ3JCLENBQUMsQ0FBQTtRQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRzlCLENBQUM7Q0FDRjtBQXBDRCw0Q0FvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgTGFtYmRhIGZyb20gIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogIGFzIER5bmFtb0RCIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGJcIlxuaW1wb3J0ICogIGFzIEFwaWdhdGV3YXkgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5XCJcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbmV4cG9ydCBjbGFzcyBEZW1vUHJvamVjdFN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAvLyByZXNvdXJjZSBuYW1lIHZhcmlhYmxlc1xuICAgICBjb25zdCB0YWJsZU5hbWU6c3RyaW5nID0gXCJEZW1vVGFibGVcIjtcblxuICAgICAvLyBUaGUgY29kZSB0aGF0IGRlZmluZXMgeW91ciBzdGFjayBnb2VzIGhlcmVcbiAgICBjb25zdCB0YWJsZSA9IG5ldyBEeW5hbW9EQi5UYWJsZSh0aGlzLFwiZGVtby10YWJsZVwiLHtcbiAgICAgICAgIHBhcnRpdGlvbktleTp7bmFtZTpcIlBLXCIsdHlwZTpEeW5hbW9EQi5BdHRyaWJ1dGVUeXBlLlNUUklOR30sXG4gICAgICAgICBzb3J0S2V5OntuYW1lOlwiU0tcIix0eXBlOkR5bmFtb0RCLkF0dHJpYnV0ZVR5cGUuU1RSSU5HfSxcbiAgICAgICAgIHRhYmxlTmFtZTp0YWJsZU5hbWUsXG4gICAgIH0pO1xuXG4gICAgIGNvbnN0IGRlbW9GdW5jdGlvbiA9IG5ldyBMYW1iZGEuRnVuY3Rpb24odGhpcyxcImRlbW8tZnVuY3Rpb25cIix7XG4gICAgICAgIGZ1bmN0aW9uTmFtZTpcImRlbW8tZnVuY3Rpb25cIixcbiAgICAgICAgcnVudGltZTpMYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgICAgY29kZTpMYW1iZGEuQ29kZS5mcm9tQXNzZXQoXCJMYW1iZGEvZGVtby1mdW5jdGlvblwiKSxcbiAgICAgICAgaGFuZGxlcjpcImluZGV4LmhhbmRsZXJcIixcbiAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICAnZGVtb190YWJsZV9uYW1lJzogdGFibGUudGFibGVOYW1lLFxuICAgICAgICB9LFxuICAgICB9KVxuXG4gICAgIHRhYmxlLmdyYW50UmVhZFdyaXRlRGF0YShkZW1vRnVuY3Rpb24pO1xuXG5cbiAgICAgY29uc3QgYXBpID0gbmV3IEFwaWdhdGV3YXkuTGFtYmRhUmVzdEFwaSh0aGlzLFwiZGVtby1hcGlcIix7XG4gICAgICAgcHJveHk6ZmFsc2UsXG4gICAgICAgaGFuZGxlcjpkZW1vRnVuY3Rpb25cbiAgICAgfSlcblxuICAgICBhcGkucm9vdC5hZGRNZXRob2QoXCJQT1NUXCIpO1xuXG4gXG4gIH1cbn1cbiJdfQ==