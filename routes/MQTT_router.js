const express = require('express')
const router = express.Router()
const mqtt = require('../controllers/MQTT_controller')

/* Authentication start here */
router.route('/control')
.get(mqtt.index)

router.route('/open')
.get(mqtt.open)

router.route('/open/:id')
.get(mqtt.openForX)

router.route('/lock')
.get(mqtt.lock)

router.route('/superlock')
.get(mqtt.superlock)

router.route('/listen/:id')
.get(mqtt.listen)

router.route('/listen')
.get(mqtt.listenNoUser)


// router.route('/access')
// .post(mqtt.accessPrivileges)

module.exports = router
