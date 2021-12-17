const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const appointmentRouter = express.Router();

appointmentRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const appointments = await prisma.appointment.findMany();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointments);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const { doctorId, hospitalId, serviceId, appointmentDateTime } = req.body;
      const appointments = await prisma.appointment.create({
        data: {
          appointmentDateTime,
          hospital: {
            connect: { id: hospitalId },
          },
          doctor: {
            connect: doctorId,
          },
          service: {
            connect: { id: serviceId },
          },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointments);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not allowed on /appointments`);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const appointments = await prisma.appointment.deleteMany({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointments);
    })
  );

appointmentRouter
  .route("/:appointmentId")
  .get(
    asyncHandler(async (req, res) => {
      const appointment = await prisma.appointment.findUnique({
        where: { id: req.params.appointmentId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointment);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /appointment/appointmentId`);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      const { doctorId, hospitalId, serviceId, appointmentDateTime } = req.body;
      const appointment = await prisma.appointment.update({
        where: { id: req.params.appointmentId },
        data: {
          appointmentDateTime,
          service: {
            connect: { id: serviceId },
          },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointment);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const appointment = await prisma.appointment.delete({
        where: { id: req.params.appointmentId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointment);
    })
  );

module.exports = appointmentRouter;
