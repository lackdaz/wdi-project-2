const express = require('express')
const router = express.Router()
const mqtt = require('../controllers/MQTT_controller')

/* Authentication start here */
router.route('/open')
.get(mqtt.open)

router.route('/listen/:id')
.get(mqtt.listen)

// router.route('/access')
// .post(mqtt.accessPrivileges)

module.exports = router
