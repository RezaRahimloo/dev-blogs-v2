import { NextApiRequest } from "next";
import formidable from "formidable";

interface FormidablePromise {
    files: formidable.Files;
    body: formidable.Fields;
}

export const readFile = (req: NextApiRequest): Promise<FormidablePromise> => {
    const form = formidable();
    return new Promise((resolve, reject) => {
        form.parse(req, (error, fields, files) => {
            if (error) {
                reject(error);
            }

            for (let key in fields) {
                
                (fields[key] as any) = fields[key][0];
                
              }

            resolve({ files, body: fields })
        })
    })
}