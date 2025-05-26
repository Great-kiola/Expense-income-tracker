const Income = require("../models/Income");
const Expense = require("../models/expense");

const {isValidObjectId, Types } = require("mongoose");

exports.getDasboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectsId = new Types.ObjectId(String(userId));

        // Fetch the total & Expenses
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId}},
            { $group: { _id: null, total: { $sum: "$amount"}}},
        ])

        console.log("totalIncome", { totalIncome, userId: isValidObject(userId)});

        const totalExpense = await expense.aggregate([
            { $match: { userId: userObjectId}},
            { $group: { _id: null, total: { $sum : "$amount"}}},
        ])

        // Get all transactions in  the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId, 
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 10000 )},
        }).sort ({ date: -1 });

        // Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction ) => sum + transaction.amount, 0
        );


        // Get expense transaction in the last 30 days
        const last30DaysExpenseTransactions = await expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 10000)},
        }).sort({date: -1})

        // Get total expenses for last 30 days
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction ) => sum + transaction.amount, 0
        )

        // Fetch last 5 transactions (income + expense)
        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            ),
        ].sort((a, b) => b.date - a.date);

        res.json({
            totalBalance:
            (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses:{
                total : expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error})
    }
}