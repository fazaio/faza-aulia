const router = require("express").Router();
const users = require("../controllers/users");
const middleware = require("../configs/middleware");

router.post("/login", users.LOGIN_USER);

router.get("/all", users.READS_USERS);
router.post("/create", users.CREATES_USERS);
router.post("/update/:id", middleware.isAuth, users.UPDATE_USERS);
router.delete("/delete/:id", middleware.isAuth, users.DELETE_USERS);

// Some Function get user by identityNumber or accountNumber
router.get("/:typenumber/:id", users.DETAIL_USERS);

module.exports = router;
