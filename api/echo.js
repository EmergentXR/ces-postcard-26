export default function handler(req, res) {
  res.status(200).json({
    hasToken: Boolean(process.env.REPLICATE_API_TOKEN),
    tokenStartsWith: (process.env.REPLICATE_API_TOKEN || "").slice(0, 3),
  });
}