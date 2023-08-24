import dbConnect from "@/lib/dbConnect";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import Joi from "joi";
import { NextApiHandler } from "next";
import { join } from "path";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      await dbConnect();
      res.json({ ok: true });

      break;
    case "POST":
      return createNewPost(req, res);

    default:
      break;
  }
};

const createNewPost: NextApiHandler = (req, res) => {
  const { body } = req;
  const error = validateSchema(postValidationSchema, body);
  if (error) {
    res.status(400).json({ error });
  }

  res.json({ ok: true });
};
export default handler;
