import supertest from "supertest";
import { describe, it, expect } from "@jest/globals";
import { createServer } from "../server";
import { log } from "@repo/logger";

describe("Server", () => {
    it("health check returns 200", async () => {
        log({ message: "health check pinged." });
        await supertest(createServer())
            .get("/status")
            .expect(200)
            .then((res) => {
                expect(res.ok).toBe(true);
            });
    });

    it("GET tasks returns a list of tasks", async () => {
        log({ message: "GET tasks pinged." });
        await supertest(createServer())
            .get("/tasks")
            .expect(200)
            .then((res) => {
                expect(Array.isArray(res.body)).toEqual(true);
            });
    });

    it("POST tasks returns a list of tasks", async () => {
        log({ message: "POST tasks pinged." });
        await supertest(createServer())
            .post("/tasks")
            .expect(200)
            .then((res) => {
                expect(res.body.acknowledged).toEqual(true);
            });
    });
});
