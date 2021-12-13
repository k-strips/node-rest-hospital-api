const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const staffRouter = express.Router();

staffRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const staffs = await prisma.staff.findMany(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(staffs);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const staffs = await prisma.staff.createMany(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(staffs);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`PUT operation not allowed on /staffs`);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const staffs = await prisma.staff.deleteMany(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(staffs);
    })
  );

staffRouter
  .route("/:staffId")
  .get(
    asyncHandler(async (req, res) => {
      const staff = await prisma.staff.findUnique({
        where: { id: req.params.staffId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(staff);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      res.statusCode = 403;
      res.end(`POST operation not supported on /staff/staffId`);
    })
  )

  .put(
    asyncHandler(async (req, res) => {
      const staff = await prisma.staff.update({
        where: { id: req.params.staffId },
        data: req.body,
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(staff);
    })
  )

  .delete(
    asyncHandler(async (req, res) => {
      const staff = await prisma.staff.delete({
        where: { id: req.params.staffId },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(staff);
    })
  );

module.exports = staffRouter;
