import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { Collection, MongoClient } from "mongodb";
import { Task } from "@repo/types";

const connectionString = "mongodb://localhost";
const client = new MongoClient(connectionString);

async function getCollection(): Promise<Collection> {
    const conn = await client.connect();
    const db = conn.db("tasks");
    const collection = await db.collection("tasks");
    return collection;
}

export const createServer = (): Express => {
    const app = express();
    app.disable("x-powered-by")
        .use(morgan("dev"))
        .use(urlencoded({ extended: true }))
        .use(json())
        .use(cors())
        .get("/status", async (_, res) => {
            return res.json({ ok: true });
        })
        .get("/tasks", async (req, res) => {
            const collection = await getCollection();
            const results = await collection.find({}).toArray();
            client.close();
            return res.json(results);
        })
        .post("/tasks", async (req, res) => {
            const collection = await getCollection();
            const task: Task = req.body;
            const result = await collection.insertOne(task);
            client.close();
            return res.json(result);
        });

    return app;
};
