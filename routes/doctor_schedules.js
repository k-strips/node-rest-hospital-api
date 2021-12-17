const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const doctorScheduleRouter = express.Router();

doctorScheduleRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const schedules = await prisma.doctor_Schedule.findMany({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(schedules);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const { startDateTime, endDateTime, doctorId } = req.body;
      const schedules = await prisma.doctor_Schedule.create({
        data: {
          startDateTime,
          endDateTime,
          doctor: { connect: { id: doctorId } },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(schedules);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not allowed on /schedules`);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const schedules = await prisma.doctor_Schedule.deleteMany({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(schedules);
    })
  );

doctorScheduleRouter
  .route("/:scheduleId")
  .get(
    asyncHandler(async (req, res) => {
      const schedule = await prisma.doctor_Schedule.findUnique({
        where: { id: req.params.scheduleId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(schedule);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /schedule/scheduleId`);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      const { startDateTime, endDateTime } = req.body;

      const schedule = await prisma.doctor_Schedule.update({
        where: { id: req.params.scheduleId },
        data: {
          startDateTime,
          endDateTime,
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(schedule);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const schedule = await prisma.doctor_Schedule.delete({
        where: { id: req.params.scheduleId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(schedule);
    })
  );

module.exports = doctorScheduleRouter;
