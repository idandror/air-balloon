import { ApolloClient, gql } from "@apollo/client";
import { Balloon } from "../../interface/balloonInterfaces";

export const CREATE_BALLOON = gql`
mutation AddBalloon($balloon: InputBalloon!) {
  addBalloon(balloon: $balloon) {
    name
    description
    type
    color
    longitude
    latitude
    altitude
  }
}
`;



export const createEditBalloonGraphql = async (
  client: ApolloClient<object>,
  balloon: Balloon
) => {
  const { data } = await client.mutate({
    mutation: CREATE_BALLOON,
    variables: { balloon },
  });
  return data.addBalloon;
};