export type ArticleType = 'message' | 'article';
export type ArticleState = 'publish' | 'draft';
export type Article = {
    title: string;
    desc?: string;
    content?: string;
    type: ArticleType;
    state: ArticleState;
    tag?: Array<string>;
    invisible: boolean;
};
