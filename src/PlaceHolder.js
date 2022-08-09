export const _similar_books =
{ 
    "name": "The Stormlight Archive",
    "avgRating": 4.45,    
    "entries": [        
        {
            "seriesEntry" : 0,
            "title": "lorem",
            "readStatus": "read",
            "avgRating" : 4,
        },
        {
            "seriesEntry" : 1,
            "title": "ipsum",
            "readStatus": "read",
            "avgRating" : 4
        },
        {
            "seriesEntry" : 3,
            "title": "The Way of Kings",
            "readStatus": "reading",
            "avgRating" : 4
        },
        {
            "seriesEntry" : 4,
            "title": "sit",
            "readStatus": "read",
            "avgRating" : 4
        },
        {
            "seriesEntry" : 5,
            "title": "ipsum",
            "readStatus": "read",
            "avgRating" : 5
        }
    ]
}
export const _genres = [
    {
        id: 0,
        tag: "Fiction",
        description: 'Fiction is the telling of stories which are not real. More specifically, fiction is an imaginative form of narrative, one of the four basic rhetorical modes. Although the word fiction is derived from the Latin fingo, fingere, finxi, fictum, "to form, create", works of fiction need not be entirely imaginary and may include real people, places, and events. Fiction may be either written or oral. Although not all fiction is necessarily artistic, fiction is largely perceived as a form of art or entertainment. The ability to create fiction and other artistic works is considered to be a fundamental aspect of human culture, one of the defining characteristics of humanity.',
        followerCount: 182917,
        userFollowsGenre: false,
    }, 
    {
        id: 1,
        tag: "Sci-fi",
        description: 'Science fiction (abbreviated SF or sci-fi with varying punctuation and capitalization) is a broad genre of fiction that often involves speculations based on current or future science or technology. Science fiction is found in books, art, television, films, games, theatre, and other media. In organizational or marketing contexts, science fiction can be synonymous with the broader definition of speculative fiction, encompassing creative works incorporating imaginative elements not found in contemporary reality; this includes fantasy, horror and related genres.',
        followerCount: 202022,
        userFollowsGenre: false,
    }, 
    {
        id: 2,
        tag: "Documentary",
        description: 'Historical fiction presents a story set in the past, often during a significant time period. In historical fiction, the time period is an important part of the setting and often of the story itself. Historical fiction may include fictional characters, well-known historical figures or a mixture of the two. Authors of historical fiction usually pay close attention to the details of their stories (settings, clothing, dialogue, etc.) to ensure that they fit the time periods in which the narratives take place.',
        followerCount: 19990,
        userFollowsGenre: false,
    } 
]

export const _feed = [
    {
        "updateType": "readingUpdate",
        "readStatus": "read",
        "user": {
            "id": 0,
            "name": "Caillin",
        },
        "timeStamp": "0 mins ago",
        "book": {
            "id": 34,
            "title":"The way of Kings",
            "authors": [
                {
                    "id": 1,
                    "name": "Brandon Sanderson",
                }
            ],
            "thumbnail":"",
            "readStatus":"read",
            "avgRating": 4.5,
            "description": "Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike. Animals hide in shells, trees pull in branches, and grass retracts into the soilless ground. Cities are built only where the topography offers shelter."   
        }  
    },
    {
        "updateType": "review",
        "review": {
            "id": 1,
            "rating": 5,
            "blurb":"The very concept of reading this book terrifies me.",
        },
        "user": {
            "id": 0,
            "name": "Truly Fubar",
        },
        "timeStamp": "10 mins ago",
        "book": {
            "id": 34,
            "title":"The way of Kings",
            "authors": [
                {
                    "id": 1,
                    "name": "Brandon Sanderson",
                }
            ],
            "thumbnail":"",
            "readStatus":"read",
            "avgRating": 4.5 ,
            "description": "Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike. Animals hide in shells, trees pull in branches, and grass retracts into the soilless ground. Cities are built only where the topography offers shelter."   
        }  
    },
    {
        "updateType": "review",
        "review": {
            "id": 1,
            "rating": 5,
            "blurb":"The very concept of reading this book terrifies me.",
        },
        "user": {
            "id": 1,
            "name": "Snafubar",
        },
        "timeStamp": "10 mins ago",
        "book": {
            "id": 34,
            "title":"The way of Kings",
            "authors": [
                {
                    "id": 1,
                    "name": "Brandon Sanderson",
                }
            ],
            "thumbnail":"",
            "readStatus":"read",
            "avgRating": 4.5,
            "description": "Roshar is a world of stone and storms. Uncanny tempests of incredible power sweep across the rocky terrain so frequently that they have shaped ecology and civilization alike. Animals hide in shells, trees pull in branches, and grass retracts into the soilless ground. Cities are built only where the topography offers shelter."   
        }  
    }
]