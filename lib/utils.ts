import { NextApiRequest } from "next";
import formidable from "formidable";

interface FormidablePromise<T> {
    files: formidable.Files;
    body: T;
}

export const readFile = <T extends object>(req: NextApiRequest): Promise<FormidablePromise<T>> => {
    const form = formidable();
    return new Promise((resolve, reject) => {
        form.parse(req, (error, fields, files) => {
            if (error) {
                reject(error);
            }

            for (let key in fields) {
                
                (fields[key] as any) = fields[key][0];
                
              }

            resolve({ files, body: fields as T })
        })
    })
}