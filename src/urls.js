
/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Fetch() determines relative URL by starting with /
 * We need that.
 * If you forget it, you will see fetch URL including the react host url
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
export function bookDetailsURL(noteID){
    return  `/book/${noteID}/`
}
export function userDetailsURL(user){
    // return `/user/${user}/`
    return `#`
}
export function reviewDetailsURL(bookID, reviewID){
    return `${bookDetailsURL(bookID)}review/${reviewID}/`
}
export function browseAllURL(){
    return "/browse/all"
}
export function authorDetailsURL(authorID){
    return `/author/${authorID}/`
}
export function genreBrowseURL(genreID){
    return `/browse/genre/${genreID}/`
}

export function followedAuthorBrowseURL(){
    return `/browse/followedAuthors/`
}
export function newReleasesBrowseURL(){
    return `/browse/newReleases/`
}
export function newlyRatedBrowseURL(){
    return `/browse/newlyRated/`
}
const myBookShelfURL = "/bookshelf/"
const myFeedURL = "/feed/"
const homeURL = "/home/"
export {myBookShelfURL, homeURL,myFeedURL}