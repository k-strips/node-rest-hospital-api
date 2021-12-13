const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const patientRouter = express.Router();

patientRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const patients = await prisma.patient.findMany(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(patients);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const patients = await prisma.patient.create(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(patients);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not allowed on /patients`);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const patients = await prisma.patient.remove({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(patients);
    })
  );

patientRouter
  .route("/:patientId")
  .get(
    asyncHandler(async (req, res) => {
      const patient = await Departments.findById(req.params.patientId);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(patient);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /patient/patientId`);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      const patient = await Departments.findByIdAndUpdate(
        req.params.patientId,
        { $set: req.body },
        { new: true }
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(patient);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const patient = await Departments.findByIdAndRemove(req.params.patientId);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(patient);
    })
  );

module.exports = patientRouter;