export type TPost = {
  author: string;
  author_id: number;
  id: number;
  title: string;
  content: string;
  votes: number;
  created_at: string;
  updated_at: string;
};

export type GetPosts = {
  posts: TPost[];
};

export type GetPost = TPost;
