import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query Tasks($filter: TaskFilter) {
    tasks(filter: $filter) {
      id
      title
      status
      priority
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
    }
  }
`;export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`;