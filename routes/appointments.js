const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const appointmentRouter = express.Router();

appointmentRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const appointments = await prisma.appointment.findMany(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointments);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const appointments = await prisma.appointment.create(req.body);
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
      const appointments = await prisma.appointment.remove({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointments);
    })
  );

appointmentRouter
  .route("/:appointmentId")
  .get(
    asyncHandler(async (req, res) => {
      const appointment = await Departments.findById(req.params.appointmentId);
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
      const appointment = await Departments.findByIdAndUpdate(
        req.params.appointmentId,
        { $set: req.body },
        { new: true }
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointment);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const appointment = await Departments.findByIdAndRemove(
        req.params.appointmentId
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointment);
    })
  );

module.exports = appointmentRouter;
