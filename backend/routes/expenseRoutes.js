const express = require("express")
const{
    addExpense,
    getAllexpense,
    deleteexpense,
    downloadexpenseExcel
} = require("../controllers/expenseController");
const {protect} = require("../middlewares/authMiddleware");


const router = express.Router();


router.post("./add", protect, addExpense);
router.get("./get", protect, getAllexpense);
router.get("./downloadExcel", protect, downloadexpenseExcel);
router.delete("./:id", protect, deleteexpense);

mmodule.exports = router;