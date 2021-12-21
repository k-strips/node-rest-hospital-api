const express = require("express");
const asyncHandler = require("express-async-handler");
const { prisma } = require("../lib/prisma");

const hospitalRouter = express.Router();

hospitalRouter
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      const hospitals = await prisma.hospital.findMany({
        include: { _count: true, address: true },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospitals);
    })
  )

  .post(
    asyncHandler(async (req, res) => {
      const {
        email,
        name,
        mobile,
        region,
        city,
        town,
        postalAddress,
        country,
      } = req.body;
      let address = {
        email: email.trim(),
        mobile,
        country,
        region,
        city,
        town,
        postalAddress,
      };
      const hospital = await prisma.hospital.create({
        data: {
          name,
          address: {
            create: {
              ...address,
            },
          },
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(hospital);
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
      const {
        email,
        name,
        mobile,
        region,
        city,
        town,
        postalAddress,
        country,
      } = req.body;
      let address = {
        email: email.trim(),
        mobile,
        country,
        region,
        city,
        town,
        postalAddress,
      };
      const hospital = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: {
          name,
          address: {
            create: {
              ...address,
            },
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
      const staffs = await prisma.hospital
        .findUnique({
          where: { id: req.params.hospitalId },
        })
        .staffs();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(staffs);
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
      const {
        firstName,
        lastName,
        middleName,
        gender,
        designation,
        nationality,
        email,
        mobile,
        city,
        town,
      } = req.params.body;
      const hospital = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: {
          staffs: {
            create: {
              firstName,
              lastName,
              middleName,
              gender,
              designation,
              nationality,
              address: {
                create: {
                  email,
                  mobile,
                  city,
                  town,
                },
              },
            },
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
      const doctors = await prisma.hospital
        .findUnique({
          where: { id: req.params.hospitalId },
        })
        .doctors();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(doctors);
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
        data: { doctors: { deleteMany: {} } },
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
      const services = await prisma.hospital
        .findUnique({
          where: { id: req.params.hospitalId },
        })
        .services();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(services);
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
  .route("/:hospitalId/appointments")
  .get(
    asyncHandler(async (req, res) => {
      const appointments = await prisma.hospital
        .findUnique({
          where: { id: req.params.hospitalId },
        })
        .appointments();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointments);
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
      const appointments = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: { appointments: { deleteMany: {} } },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(appointments);
    })
  );

hospitalRouter
  .route("/:hospitalId/patients")
  .get(
    asyncHandler(async (req, res) => {
      const patients = await prisma.hospital
        .findUnique({
          where: { id: req.params.hospitalId },
        })
        .patients();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(patients);
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
      const patients = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: { patients: { deleteMany: {} } },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(patients);
    })
  );

hospitalRouter
  .route("/:hospitalId/medicines")
  .get(
    asyncHandler(async (req, res) => {
      const medicines = await prisma.hospital
        .findUnique({
          where: { id: req.params.hospitalId },
        })
        .medicines();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(medicines);
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
      const medicines = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: { medicines: { deleteMany: {} } },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(medicines);
    })
  );

hospitalRouter
  .route("/:hospitalId/treatments")
  .get(
    asyncHandler(async (req, res) => {
      const treatments = await prisma.hospital
        .findUnique({
          where: { id: req.params.hospitalId },
        })
        .treatments();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatments);
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
      const treatments = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: { treatments: { deleteMany: {} } },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatments);
    })
  );

hospitalRouter
  .route("/:hospitalId/treatment_details")
  .get(
    asyncHandler(async (req, res) => {
      const treatment_detais = await prisma.hospital
        .findUnique({
          where: { id: req.params.hospitalId },
        })
        .treatment_detais();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatment_detais);
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
      const treatment_detais = await prisma.hospital.update({
        where: { id: req.params.hospitalId },
        data: { treatment_detais: { deleteMany: {} } },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(treatment_detais);
    })
  );

module.exports = hospitalRouter;
