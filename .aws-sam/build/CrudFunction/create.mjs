import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE",
    "Access-Control-Allow-Headers": "Content-Type"
};

export const handler = async (event) => {
    if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

    if (event.httpMethod === "GET") {
        const data = await docClient.send(new ScanCommand({ TableName: process.env.TABLE_NAME }));
        return { statusCode: 200, headers, body: JSON.stringify(data.Items) };
    }

    if (event.httpMethod === "POST") {
        const { name, age } = JSON.parse(event.body);
        const uniqueId = randomUUID();
        await docClient.send(new PutCommand({
            TableName: process.env.TABLE_NAME,
            Item: { uniqueId, name, age }
        }));
        return { statusCode: 201, headers, body: JSON.stringify({ message: "Added!", uniqueId }) };
    }
};