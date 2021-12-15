const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const hospitalRouter = express.Router();

hospitalRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const hospitals = await prisma.hospital.findMany({
        include: { staffs: true, doctors: true, _count: true },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospitals);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      console.log(req);
      const hospitals = await prisma.hospital.createMany({
        data: {
          name: req.params.name,
          address: {
            create: {
              email: req.body.email,
              office: req.body.office,
            },
          },
        },
      });
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

hospitalRouter
  .route("/:hospitalId/staffs")
  .get(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.findUnique({
        where: { id: req.params.hospitalId },
        include: { staffs: true },
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
        data: {
          staffs: {
            create: req.body,
          },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: { staffs: { deleteMany: {} } },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  );

hospitalRouter
  .route("/:hospitalId/staffs/:staffId")
  .get(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.findUnique({
        where: { id: req.params.hospitalId },
        include: { staffs: true },
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
        data: {
          staffs: {
            create: req.body,
          },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: { staffs: { deleteMany: {} } },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  );

hospitalRouter
  .route("/:hospitalId/doctors")
  .get(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.findUnique({
        where: { id: req.params.hospitalId },
        include: { staffs: true },
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
        data: {
          staffs: {
            create: req.body,
          },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: { staffs: { deleteMany: {} } },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  );

hospitalRouter
  .route("/:hospitalId/doctors/:doctorId")
  .get(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.findUnique({
        where: { id: req.params.hospitalId },
        include: { staffs: true },
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
        data: {
          staffs: {
            create: req.body,
          },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: { staffs: { deleteMany: {} } },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  );

hospitalRouter
  .route("/:hospitalId/services")
  .get(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.findUnique({
        where: { id: req.params.hospitalId },
        include: { services: true },
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
        data: {
          services: {
            create: req.body,
          },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: { services: { deleteMany: {} } },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  );

hospitalRouter
  .route("/:hospitalId/services/:serviceId")
  .get(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.findUnique({
        where: { id: req.params.hospitalId },
        include: { staffs: true },
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
        data: {
          staffs: {
            create: req.body,
          },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: { staffs: { deleteMany: {} } },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  );

hospitalRouter
  .route("/:hospitalId/appointments")
  .get(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.findUnique({
        where: { id: req.params.hospitalId },
        include: { appointments: true },
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
        data: {
          appointments: {
            create: req.body,
          },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: { appointments: { deleteMany: {} } },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  );

hospitalRouter
  .route("/:hospitalId/appointments/:appointmentId")
  .get(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.findUnique({
        where: { id: req.params.hospitalId },
        include: { staffs: true },
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
        data: {
          staffs: {
            create: req.body,
          },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const hospital = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: { staffs: { deleteMany: {} } },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
    })
  );

module.exports = hospitalRouter;
