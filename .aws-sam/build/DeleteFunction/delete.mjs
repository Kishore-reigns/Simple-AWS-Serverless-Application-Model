import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE",
    "Access-Control-Allow-Headers": "Content-Type"
};

export const handler = async (event) => {
    if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

    const uniqueId = event.queryStringParameters?.id;

    if (!uniqueId) {
        return { statusCode: 400, headers, body: JSON.stringify({ message: "Missing ID" }) };
    }

    try {
        await docClient.send(new DeleteCommand({
            TableName: process.env.TABLE_NAME,
            Key: { uniqueId } // Must match the Table's Primary Key name
        }));
        return { statusCode: 200, headers, body: JSON.stringify({ message: "Deleted!" }) };
    } catch (error) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
    }
};