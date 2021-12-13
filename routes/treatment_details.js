const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const treatmentDetailsRouter = express.Router();

treatmentDetailsRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const treatment_details = await prisma.treatment_detail.findMany(
        req.body
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatment_details);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const treatment_details = await prisma.treatment_detail.create(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatment_details);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not allowed on /treatment_details`);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const treatment_details = await prisma.treatment_detail.remove({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatment_details);
    })
  );

treatmentDetailsRouter
  .route("/:treatment_detailId")
  .get(
    asyncHandler(async (req, res) => {
      const treatment_detail = await Departments.findById(
        req.params.treatment_detailId
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatment_detail);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(
        `POST operation not supported on /treatment_detail/treatment_detailId`
      );
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      const treatment_detail = await Departments.findByIdAndUpdate(
        req.params.treatment_detailId,
        { $set: req.body },
        { new: true }
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatment_detail);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const treatment_detail = await Departments.findByIdAndRemove(
        req.params.treatment_detailId
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatment_detail);
    })
  );

module.exports = treatmentDetailsRouter;
