import { gql } from '@apollo/client';

// Query to get a list of videos
export const GET_VIDEOS = gql`
  query GetVideos {
    videos {
      id
      title
      url
      user {
        id
        username
      }
      likes
      comments
    }
  }
`;

// Query to get a specific video by ID
export const GET_VIDEO_BY_ID = gql`
  query GetVideoById($id: ID!) {
    video(id: $id) {
      id
      title
      url
      user {
        id
        username
      }
      likes
      comments
    }
  }
`;

// Query to get user details
export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      profilePicture
      videos {
        id
        title
        url
      }
    }
  }
`;
