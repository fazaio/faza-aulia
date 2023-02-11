const router = require("express").Router();
const users = require("../controllers/users");
const middleware = require("../configs/middleware");

router.get("/generateToken", users.GENERATE_TOKEN);

router.get("/all", middleware.isAuth, users.READS_USERS);
router.post("/create", middleware.isAuth, users.CREATES_USERS);
router.post("/update/:id", middleware.isAuth, users.UPDATE_USERS);
router.delete("/delete/:id", middleware.isAuth, users.DELETE_USERS);

// Some Function get user by identityNumber or accountNumber
router.get("/:typenumber/:id", users.DETAIL_USERS);

module.exports = router;
