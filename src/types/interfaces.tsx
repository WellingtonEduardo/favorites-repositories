export interface DataApi {
  fullName: string;
}

export interface FormProps {
  $alert: boolean
}

export interface RepositoryObj {
  name: string;
  description: string;
  owner: {
    avatar_url: string,
    login: string
  }
}