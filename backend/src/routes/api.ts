import express from "express";
const router = express.Router();

const sampleObjectList = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

// smaple
router.get("/sample", function (req, res) {
  res.json(sampleObjectList);
});

export default router;
