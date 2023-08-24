import dbConnect from "@/lib/dbConnect";
import { readFile } from "@/lib/utils";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import Post from "@/models/Post";
import Joi from "joi";
import { NextApiHandler } from "next";
import { join } from "path";

export const config = {
  api: {
    bodyParser: false
  }
};

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

const createNewPost: NextApiHandler = async (req, res) => {
  const { files, body } = await readFile(req);
  
  let tags = [];
  if (body.tags) {
    tags = JSON.parse(body.tags as any)
  }

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) {
    res.status(400).json({ error });
  }

  const {
    title,
    content,
    slug,
    meta
  } = body;

  await dbConnect();
  const alreadyExists = await Post.findOne({ slug });
  if (alreadyExists) {
    return res.status(400).json({ error: "Slug needs to be unique" });
  }

  const newPost = new Post({
    title,
    slug,
    meta,
    tags,
    content
  });

  await newPost.save();

  res.json({ post: newPost });
};
export default handler;
