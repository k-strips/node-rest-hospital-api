const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const hospitalRouter = express.Router();

hospitalRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const hospitals = await prisma.hospital.findMany(req.body);
      console.log(hospitals);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospitals);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      console.log(req);
      const hospitals = await prisma.hospital.createMany({ data: req.body });
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
      const hospitals = await prisma.hospital.deleteMany({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospitals);
    })
  );

hospitalRouter
  .route("/:hospitalId")
  .get(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.findUnique({
        where: { id: req.params.hospitalId },
      });
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
      const hospital = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: req.body,
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.delete({
        where: { id: req.params.hospitalId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  );

module.exports = hospitalRouter;
