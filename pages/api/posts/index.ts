import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import { readFile } from "@/lib/utils";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import Post from "@/models/Post";
import formidable from "formidable";
import Joi from "joi";
import { NextApiHandler } from "next";
import { join } from "path";

export const config = {
  api: {
    bodyParser: false,
  },
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
interface IncomingPost {
  title: string;
  content: string;
  slug: string;
  meta: string;
  tags: string;
}
const createNewPost: NextApiHandler = async (req, res) => {
  const { files, body } = await readFile<IncomingPost>(req);

  let tags = [];
  if (body.tags) {
    tags = JSON.parse(body.tags as any);
  }

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) {
    res.status(400).json({ error });
  }

  const { title, content, slug, meta } = body;

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
    content,
  });

  //uploading thumbnail if there is any
  const thumbnail = files.thumbnail[0] as formidable.File;
  if (thumbnail) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: "dev-blogs",
      }
    );
    newPost.thumbnail = { url, public_id };
  }
  await newPost.save();

  res.json({ post: newPost });
};
export default handler;
