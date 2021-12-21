const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const appointmentRouter = require("./routes/appointments");
const doctorScheduleRouter = require("./routes/doctor_schedules");
const doctorRouter = require("./routes/doctors");
const hospitalRouter = require("./routes/hospitals");
const medicineRouter = require("./routes/medicines");
const patientRouter = require("./routes/patients");
const serviceRouter = require("./routes/services");
const staffRouter = require("./routes/staffs");
const treatmentDetailsRouter = require("./routes/treatment_details");
const treatmentRouter = require("./routes/treatments");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/appointments", appointmentRouter);
app.use("/doctor-schedules", doctorScheduleRouter);
app.use("/doctors", doctorRouter);
app.use("/hospitals", hospitalRouter);
app.use("/medicine", medicineRouter);
app.use("/patients", patientRouter);
app.use("/services", serviceRouter);
app.use("/staffs", staffRouter);
app.use("/treatment", treatmentRouter);
app.use("/treatment-details", treatmentDetailsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
