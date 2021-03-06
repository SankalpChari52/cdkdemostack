"use strict";
let AWS = require("aws-sdk");
const DEMO_TABLE = process.env.demo_table_name;
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2" });
exports.handler = async (event, context, callback) => {
    let _body = JSON.parse(event.body);
    console.log(_body);
    const response = await saveDataToTable(_body);
    if (response) {
        return {
            statusCode: 200,
            body: JSON.stringify({ "message": "data saved successfully" }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    else {
        return {
            statusCode: 403,
            body: JSON.stringify({ "message": "some error occured" }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};
const saveDataToTable = async (insertData) => {
    const params = {
        TableName: DEMO_TABLE,
        Item: {
            ...insertData,
            created: +Date.now(),
        }
    };
    try {
        await documentClient.put(params).promise();
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}; //function end
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRTdCLE1BQU0sVUFBVSxHQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0FBRS9DLE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBQyxNQUFNLEVBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQTtBQUU1RSxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFVLEVBQUUsT0FBWSxFQUFFLFFBQWEsRUFBRSxFQUFFO0lBRWhFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFbkIsTUFBTSxRQUFRLEdBQVcsTUFBTSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFdEQsSUFBRyxRQUFRLEVBQUM7UUFDUixPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLFNBQVMsRUFBQyx5QkFBeUIsRUFBQyxDQUFDO1lBQzNELE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUUsa0JBQWtCO2FBQ3JDO1NBQ0osQ0FBQztLQUNMO1NBQUk7UUFDRCxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLFNBQVMsRUFBQyxvQkFBb0IsRUFBQyxDQUFDO1lBQ3RELE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUUsa0JBQWtCO2FBQ3JDO1NBQ0osQ0FBQztLQUNMO0FBRUwsQ0FBQyxDQUFBO0FBR0QsTUFBTSxlQUFlLEdBQUcsS0FBSyxFQUFFLFVBQWUsRUFBRSxFQUFFO0lBQzlDLE1BQU0sTUFBTSxHQUFHO1FBQ1gsU0FBUyxFQUFFLFVBQVU7UUFDckIsSUFBSSxFQUFFO1lBQ0YsR0FBRyxVQUFVO1lBQ2IsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtTQUN2QjtLQUNKLENBQUM7SUFFRixJQUFJO1FBQ0EsTUFBTSxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNMLENBQUMsQ0FBQSxDQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgQVdTID0gcmVxdWlyZShcImF3cy1zZGtcIik7XHJcblxyXG5jb25zdCBERU1PX1RBQkxFICA9IHByb2Nlc3MuZW52LmRlbW9fdGFibGVfbmFtZVxyXG5cclxuY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KHtyZWdpb246XCJ1cy1lYXN0LTJcIn0pXHJcblxyXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSwgY29udGV4dDogYW55LCBjYWxsYmFjazogYW55KSA9PiB7XHJcblxyXG4gICAgbGV0IF9ib2R5ID0gSlNPTi5wYXJzZShldmVudC5ib2R5KTtcclxuICAgIGNvbnNvbGUubG9nKF9ib2R5KTtcclxuXHJcbiAgICBjb25zdCByZXNwb25zZTpib29sZWFuID0gYXdhaXQgc2F2ZURhdGFUb1RhYmxlKF9ib2R5KTtcclxuXHJcbiAgICBpZihyZXNwb25zZSl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XCJtZXNzYWdlXCI6XCJkYXRhIHNhdmVkIHN1Y2Nlc3NmdWxseVwifSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGF0dXNDb2RlOiA0MDMsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcIm1lc3NhZ2VcIjpcInNvbWUgZXJyb3Igb2NjdXJlZFwifSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuY29uc3Qgc2F2ZURhdGFUb1RhYmxlID0gYXN5bmMgKGluc2VydERhdGE6IGFueSkgPT4ge1xyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIFRhYmxlTmFtZTogREVNT19UQUJMRSxcclxuICAgICAgICBJdGVtOiB7XHJcbiAgICAgICAgICAgIC4uLmluc2VydERhdGEsXHJcbiAgICAgICAgICAgIGNyZWF0ZWQ6ICtEYXRlLm5vdygpLFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBkb2N1bWVudENsaWVudC5wdXQocGFyYW1zKS5wcm9taXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59IC8vZnVuY3Rpb24gZW5kXHJcbiJdfQ==