const mongoose = require("mongoose");

const RankingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  rankedFoods: [
    {
      foodName: { type: String, required: true },
      rank: { type: Number, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ranking", RankingSchema);
