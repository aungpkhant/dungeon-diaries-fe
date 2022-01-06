export type TComment = {
  author: string;
  author_id: number;
  author_profile_image: string | null;
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  depth: number;
  lineage: string;
};

export type TCommentNested = TComment & {
  child_comments?: TCommentNested[];
};

export type GetComments = TCommentNested[];
