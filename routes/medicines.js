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
      const medicines = await prisma.medicine.create(req.body);
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
      const medicines = await prisma.medicine.remove({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(medicines);
    })
  );

medicineRouter
  .route("/:medicineId")
  .get(
    asyncHandler(async (req, res) => {
      const medicine = await Departments.findById(req.params.medicineId);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(medicine);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /hospital/hospitalId`);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      const hospital = await Departments.findByIdAndUpdate(
        req.params.hospitalId,
        { $set: req.body },
        { new: true }
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const hospital = await Departments.findByIdAndRemove(
        req.params.hospitalId
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  );

module.exports = medicineRouter;
