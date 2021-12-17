const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const patientRouter = express.Router();

patientRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const patients = await prisma.patient.findMany({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(patients);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const {
        firstName,
        lastName,
        middleName,
        gender,
        nationality,
        dob,
        bloodGroup,
        mobile,
        phone,
        hospitalId,
        country,
        region,
        city,
        town,
        postalAddress,
      } = req.body;

      const address = {
        country,
        region,
        city,
        town,
        postalAddress,
        mobile,
        phone,
      };
      const patients = await prisma.patient.create({
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          middleName: middleName.trim(),
          gender,
          nationality,
          dob,
          bloodGroup,
          address: {
            create: {
              ...address,
            },
          },
          hospital: {
            connect: { id: hospitalId },
          },
        },
      });
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
      const patients = await prisma.patient.deleteMany({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(patients);
    })
  );

patientRouter
  .route("/:patientId")
  .get(
    asyncHandler(async (req, res) => {
      const patient = await prisma.patient.findUnique({
        where: { id: req.params.patientId },
      });
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
      const {
        firstName,
        lastName,
        middleName,
        gender,
        nationality,
        dob,
        bloodGroup,
        mobile,
        phone,
        hospitalId,
        country,
        region,
        city,
        town,
        postalAddress,
      } = req.body;

      const address = {
        country,
        region,
        city,
        town,
        postalAddress,
        mobile,
        phone,
      };
      const patient = await prisma.patient.update({
        where: { id: req.params.patientId },
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          middleName: middleName.trim(),
          gender,
          nationality,
          dob,
          bloodGroup,
          address: {
            update: {
              ...address,
            },
          },
          hospital: {
            connect: { id: hospitalId },
          },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(patient);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const patient = await prisma.patient.delete({
        where: { id: req.params.patientId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(patient);
    })
  );

module.exports = patientRouter;
