const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const doctorRouter = express.Router();

doctorRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const doctors = await prisma.doctor.findMany(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(doctors);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const doctors = await prisma.doctor.create(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(doctors);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not allowed on /doctors`);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const doctors = await prisma.doctor.remove({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(doctors);
    })
  );

doctorRouter
  .route("/:doctorId")
  .get(
    asyncHandler(async (req, res) => {
      const doctor = await Departments.findById(req.params.doctorId);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(doctor);
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

module.exports = doctorRouter;
