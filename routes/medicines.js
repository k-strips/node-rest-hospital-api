const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const medicineRouter = express.Router();

medicineRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const medicines = await prisma.medicine.findMany(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(medicines);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const medicines = await prisma.medicine.createMany(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(medicines);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not allowed on /medicines`);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const medicines = await prisma.medicine.delete(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(medicines);
    })
  );

medicineRouter
  .route("/:medicineId")
  .get(
    asyncHandler(async (req, res) => {
      const medicine = await prisma.medicine.findUnique({
        where: { id: req.params.medicineId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(medicine);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /medicine/medicineId`);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      const medicine = await prisma.medicine.update({
        where: { id: req.params.medicineId },
        data: req.body,
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(medicine);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const medicine = await prisma.medicine.delete({
        where: { id: req.params.medicineId },
      });

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(medicine);
    })
  );

module.exports = medicineRouter;
