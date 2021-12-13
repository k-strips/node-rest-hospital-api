const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const hospitalRouter = express.Router();

hospitalRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const hospitals = await prisma.hospital.findMany(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospitals);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const hospitals = await prisma.hospital.create(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospitals);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not allowed on /hospitals`);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const hospitals = await prisma.hospital.remove({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospitals);
    })
  );

hospitalRouter
  .route("/:hospitalId")
  .get(
    asyncHandler(async (req, res) => {
      const hospital = await Departments.findById(req.params.hospitalId);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
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

module.exports = hospitalRouter;
