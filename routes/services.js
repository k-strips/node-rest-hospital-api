const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const serviceRouter = express.Router();

serviceRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const services = await prisma.service.findMany({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(services);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const { hospitalId, serviceFee, serviceName, description } = req.body;
      const services = await prisma.service.create({
        data: {
          serviceName,
          serviceFee,
          description,
          hospital: { connect: { id: hospitalId } },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(services);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not allowed on /services`);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const services = await prisma.service.deleteMany({});
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(services);
    })
  );

serviceRouter
  .route("/:serviceId")
  .get(
    asyncHandler(async (req, res) => {
      const service = await prisma.service.findUnique({
        where: { id: req.params.serviceId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(service);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /service/serviceId`);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      const { serviceId, serviceFee, serviceName, description } = req.body;
      const service = await prisma.service.update({
        where: { id: serviceId },
        data: {
          serviceName,
          serviceFee,
          description,
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(service);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const service = await prisma.service.delete({
        where: { id: req.params.serviceId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(service);
    })
  );

module.exports = serviceRouter;
