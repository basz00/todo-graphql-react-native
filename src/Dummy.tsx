import { View, Text } from "react-native";
import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      note
      status
      updatedAt
    }
  }
`;

const Dummy = () => {
  const { data, loading, error } = useQuery(GET_TODOS);

  console.log("data", data);
  console.log("loading", loading);
  console.log("error", error);

  return (
    <View>
      <Text>Dummy</Text>
    </View>
  );
};

export default Dummy;
