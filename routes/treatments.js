const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const treatmentRouter = express.Router();

treatmentRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const treatments = await prisma.treatment.findMany({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatments);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const { appointmentId, remarks } = req.body;
      const treatments = await prisma.treatment.create({
        data: {
          remarks,
          appointment: { connect: { id: appointmentId } },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatments);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not allowed on /treatments`);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const treatments = await prisma.treatment.deleteMany({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatments);
    })
  );

treatmentRouter
  .route("/:treatmentId")
  .get(
    asyncHandler(async (req, res) => {
      const treatment = await prisma.treatment.findUnique({
        where: { id: req.params.treatmentId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatment);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /treatment/treatmentId`);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      const { appointmentId, remarks } = req.body;
      const treatment = await prisma.treatment.update({
        where: { id: req.params.treatmentId },
        data: {
          remarks,
          appointment: { connect: { id: appointmentId } },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatment);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const treatment = await prisma.treatment.delete({
        where: { id: req.params.treatmentId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatment);
    })
  );

module.exports = treatmentRouter;
