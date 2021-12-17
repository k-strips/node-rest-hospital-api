const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const doctorRouter = express.Router();

doctorRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const doctors = await prisma.doctor.findMany();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(doctors);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const {
        firstName,
        lastName,
        middleName,
        specialization,
        gender,
        hospitalId,
        email,
        phone,
      } = req.body;
      const address = { email, phone };
      const doctors = await prisma.doctor.create({
        data: {
          firstName: firstName?.trim(),
          lastName: lastName?.trim(),
          middleName: middleName?.trim(),
          specialization,
          gender,
          hospital: {
            connect: { id: hospitalId },
          },
          address: { create: { ...address } },
        },
      });
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
      const {
        firstName,
        lastName,
        middleName,
        specialization,
        gender,
        hospitalId,
        email,
        phone,
      } = req.body;
      const address = { email, phone };
      const doctor = await prisma.doctor.update({
        where: { id: req.params.doctorId },
        data: {
          firstName: firstName?.trim(),
          lastName: lastName?.trim(),
          middleName: middleName?.trim(),
          specialization,
          gender,
          address: { update: { ...address } },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(doctor);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const doctor = await prisma.doctor.delete({
        where: { id: req.params.doctorId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(doctor);
    })
  );

module.exports = doctorRouter;
