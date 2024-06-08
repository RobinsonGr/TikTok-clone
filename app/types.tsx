export interface MenuItemTypes {
    iconString: string
    colorString: string
    sizeString: string
}

export interface UsertToFollow {
    id: string;
    name: string;
    image: string;
}

export interface PostDetails {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
}

//Components
export interface PostBodyCompTypes {
    post: PostDetails
}


// THOSE ARE FOR THE LAYOUT
export interface UserToFollowTypes {
    user: UsertToFollow
}
