const express = require("express")
const{
    addexpense,
    getAllexpense,
    deleteexpense,
    downloadexpenseExcel
} = require("../controllers/expenseController");
const {protect} = require("../middlewares/authMiddleware");


const router = express.Router();


router.post("./add", protect, addexpense);
router.get("./get", protect, getAllexpense);
router.get("./downloadExcel", protect, downloadexpenseExcel);
router.delete("./:id", protect, deleteexpense);

mmodule.exports = router;