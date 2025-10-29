import express from "express";
const router = express.Router();


router.get("/test", (req, res) => {
  res.json({
    message: "Deployment successful! Your backend is running smoothly.",
    timestamp: new Date(),
  });
});

export default router;
