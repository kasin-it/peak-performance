import { Asset, Entry } from "contentful"

export interface Article {
    //Article
    /*  */
    readonly author: Entry<Author>
    readonly content: { content: any; data: any; nodeType: string }
    readonly lowResImage: Asset
    readonly mainImage: Asset
    readonly shortDesc: string
    readonly slug?: string
    readonly title: string
}

export interface Author {
    //Author
    /*  */
    readonly articles: ReadonlyArray<Entry<Article>>
    readonly nameOfAuthor?: string
    readonly pictureOfAuthor?: Asset
    readonly slug?: string
}
