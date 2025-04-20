import { RemoteNote, RemoteNoteStatus } from "@/features/note/common/entities";
import { CreateNote } from "@/features/note/create/domain/entities";
import { createMockGraphQLWrapper } from "@/test-utils";
import { MockedResponse, wait } from "@apollo/client/testing";
import { renderHook, waitFor } from "@testing-library/react-native";
import { act } from "react";
import { CREATE_NOTE } from "../../query";
import { useCreateNoteDataSource } from "../useCreateNoteDataSource";
import { GraphQLError } from "graphql";
import { FetchResult } from "@apollo/client";

const mock: MockedResponse<{ createNote: RemoteNote }, CreateNote> = {
  delay: 30,
  request: {
    query: CREATE_NOTE,
    variables: {
      title: "Test Title",
      note: "Test Note",
    },
  },
  result: {
    data: {
      createNote: {
        id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "Test Title",
        note: "Test Note",
        status: RemoteNoteStatus.Pending,
        creatorId: 0,
      },
    },
  },
};

describe("useCreateNoteDataSource", () => {
  it("should update loading state according to mutation loading state", async () => {
    const wrapper = createMockGraphQLWrapper({
      mocks: [mock],
    });
    const { result } = renderHook(() => useCreateNoteDataSource(), {
      wrapper,
    });

    // wait for initial state
    await waitFor(() => expect(result.current.state.loading).toBe(false));

    // execution
    await act(async () => {
      result.current.execute({ title: "Test Title", note: "Test Note" });
    });

    // wait for the state when the execution is running
    await waitFor(() => expect(result.current.state.loading).toBe(true));
    console.log("result.current.state 3", result.current.state);

    // wait for the state when the execution finished
    await waitFor(() => expect(result.current.state.loading).toBe(false));
    console.log("result.current.state 4", result.current.state);
  });

  it("network error should update error state correctly", async () => {
    const mockNetworkError = new Error("Network error");
    const updatedMock = { ...mock, result: undefined, error: mockNetworkError };

    const wrapper = createMockGraphQLWrapper({
      mocks: [updatedMock],
    });

    const { result } = renderHook(() => useCreateNoteDataSource(), {
      wrapper,
    });

    await act(async () => {
      try {
        await result.current.execute({
          title: "Test Title",
          note: "Test Note",
        });
      } catch (_) {}
    });

    await waitFor(() =>
      expect(result.current.state.error?.message).toBe(mockNetworkError.message)
    );
  });

  it("graphql error should update error state correctly", async () => {
    const mockGraphQLError = new GraphQLError("Error!");
    const updatedMock = { ...mock, result: { errors: [mockGraphQLError] } };

    const wrapper = createMockGraphQLWrapper({
      mocks: [updatedMock],
    });

    const { result } = renderHook(() => useCreateNoteDataSource(), {
      wrapper,
    });

    await act(async () => {
      try {
        await result.current.execute({
          title: "Test Title",
          note: "Test Note",
        });
      } catch (_) {}
    });

    await waitFor(() =>
      expect(result.current.state.error?.message).toBe(mockGraphQLError.message)
    );
  });

  it("should update data state correctly", async () => {
    const wrapper = createMockGraphQLWrapper({
      mocks: [mock],
    });
    const { result } = renderHook(() => useCreateNoteDataSource(), {
      wrapper,
    });

    await act(async () => {
      await result.current.execute({ title: "Test Title", note: "Test Note" });
    });

    const resultToBeAsserted = (
      mock.result as FetchResult<{ createNote: RemoteNote }>
    ).data;
    await waitFor(() =>
      expect(result.current.state.data).toEqual(resultToBeAsserted)
    );
  });
});
