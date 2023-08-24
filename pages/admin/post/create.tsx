import Editor, { FinalPost } from '@/components/editor';
import AdminLayout from '@/components/layout/AdminLayout';
import axios from 'axios';
import { NextPage } from 'next';

interface Props { }

const Create: NextPage<Props> = () => {
  const handleSubmit = async (post: FinalPost) => {
    try {
      const formData = new FormData();
      for (let key in post) {
        const value = ((post as any)[key] as string);
        if (key === "tags" && value.trim()) {
          const tags = (value as string).split(',').map((tag: string) => tag.trim());
          formData.append(key, JSON.stringify(tags));
        } else {
          formData.append(key, value)
        }
      }
      await axios.post("/api/posts", formData);
    } catch (error: any) {
      console.log(error.response.data)
    }
  }


  return (
    <AdminLayout title='New Post'>
      <div className='max-w-4xl mx-auto'>
        <Editor
          onSubmit={handleSubmit}
        />
      </div>
    </AdminLayout>


  )
};

export default Create;