import { gql } from "@apollo/client";

export const GET_ROCKET_LAUNCHES = gql`
  query Launches {
    launches {
      mission_name
      mission_id
      rocket {
        rocket_name
        rocket {
          company
          name
          mass {
            kg
          }
        }
      }
      launch_site {
        site_name
      }
      links {
        video_link
        flickr_images
        article_link
      }
      details
      launch_success
      launch_year
      launch_date_local
    }
  }
`;
