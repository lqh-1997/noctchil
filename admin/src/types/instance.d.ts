export type ArticleType = 'message' | 'article';
export type ArticleState = 'publish' | 'draft';
export interface Article {
    title: string;
    desc?: string;
    content?: string;
    type: ArticleType;
    state: ArticleState;
    tag?: Array<string>;
    invisible: boolean;
}

export interface User {
    username: string;
    password: string;
}

export interface SubMenuItem {
    name: string;
    url?: string;
    target?: '_blank' | '_self';
}
export interface MenuItem extends SubMenuItem {
    children?: Array<SubMenuItem>;
}
export type HeaderMenu = Array<MenuItem>;
