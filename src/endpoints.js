
/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Fetch() determines relative URL by starting with /
 * We need that.
 * If you forget it, you will see fetch URL including the react host url
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
export function bookFetchEndpoint(bookID){
    return  `/api/book/${bookID}/`
}
export function bookReviewsFetchUrl(bookID){
    return  `/api/book/${bookID}/reviews/`
}
export function authorFetchEndpoint(authorID){
    return  `/api/author/${authorID}/`
}

export function getAllBooks(){
    return  `/api/books/`
}

export function loginEndpoint(){
    return  `/api/login/`
}

