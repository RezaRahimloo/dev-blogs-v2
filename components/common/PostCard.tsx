import { PostDetail } from '@/utils/types';
import { FC } from 'react';

interface Props {
    post: PostDetail;
}

const PostCard: FC<Props> = (props): JSX.Element => {
  return <div>PostCard</div>;
};

export default PostCard;