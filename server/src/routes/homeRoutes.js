const express = require('express');
const loginRequired = require("../middlewares/loginRequired");
const router = express.Router();

router.get('/', loginRequired, async (req, res) => {
    return res.status(200).json({ message: "Hello world!" });
});

module.exports = router;