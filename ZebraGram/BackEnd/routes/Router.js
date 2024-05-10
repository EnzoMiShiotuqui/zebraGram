const express = require('express')
const router = express()

router.use("/api/users", require("./UserRoutes"))
router.use("/api/photos", require("./PhotosRoutes"))

module.exports = router