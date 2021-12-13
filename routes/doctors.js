const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const doctorRouter = express.Router();

doctorRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const doctors = await prisma.doctor.findMany({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(doctors);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const doctors = await prisma.doctor.createMany({ data: req.body });
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
      const doctors = await prisma.doctor.deleteMany({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(doctors);
    })
  );

doctorRouter
  .route("/:doctorId")
  .get(
    asyncHandler(async (req, res) => {
      const doctor = await prisma.doctor.findUnique({
        where: { id: req.params.doctorId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(doctor);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /doctor/doctorId`);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      const doctor = await prisma.doctor.update({
        where: { id: req.params.doctorId },
        data: req.body,
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(doctor);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const doctor = await prisma.doctor.deleteMany({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(doctor);
    })
  );

module.exports = doctorRouter;
