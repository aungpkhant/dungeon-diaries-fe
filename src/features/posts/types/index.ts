export type TPost = {
  author: string;
  author_id: number;
  id: number;
  title: string;
  content: string;
  image: string;
  votes: number;
  user_vote: -1 | 0 | 1;
  created_at: string;
  updated_at: string;
  comment_count: string;
};

export type GetPosts = {
  posts: TPost[];
};

export type GetPost = TPost;

export type VotePost = {
  post_id: number;
  votes: number;
  user_vote: TPost['user_vote'];
};
