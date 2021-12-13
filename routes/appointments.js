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
      const appointments = await prisma.appointment.createMany({
        data: req.body,
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
      const appointment = await Departments.findUnique({
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
      const appointment = await Departments.update({
        where: { id: req.params.appointmentId },
        data: req.body,
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointment);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const appointment = await Departments.delete({
        where: { id: req.params.appointmentId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointment);
    })
  );

module.exports = appointmentRouter;
