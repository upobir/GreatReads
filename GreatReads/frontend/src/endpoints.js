
export const serverURL= "http://localhost:8000/"

export function bookFetchEndpoint(noteID){
    return serverURL + `api/book/${noteID}/`
}
