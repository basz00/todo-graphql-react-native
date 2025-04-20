import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
  mutation CreateNote($title: String, $note: String!, $creatorId: ID) {
    createNote(title: $title, note: $note, creatorId: $creatorId) {
      id
      title
      note
      status
      creatorId
      createdAt
      updatedAt
    }
  }
`;
