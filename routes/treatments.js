const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const treatmentRouter = express.Router();

treatmentRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const treatments = await prisma.treatment.findMany(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatments);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const treatments = await prisma.treatment.create(req.body);
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
      const treatments = await prisma.treatment.remove({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatments);
    })
  );

treatmentRouter
  .route("/:treatmentId")
  .get(
    asyncHandler(async (req, res) => {
      const treatment = await Departments.findById(req.params.treatmentId);
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
      const treatment = await Departments.findByIdAndUpdate(
        req.params.treatmentId,
        { $set: req.body },
        { new: true }
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatment);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const treatment = await Departments.findByIdAndRemove(
        req.params.treatmentId
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatment);
    })
  );

module.exports = treatmentRouter;
