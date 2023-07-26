export interface DataApi {
  fullName: string;
}


export interface FormProps {
  $alert: boolean
}


export interface RepositoryObj {
  name: string,
  description: string,
  owner: {
    avatar_url: string,
    login: string
  }
}


export interface IssuesObj {

  id: number,
  html_url: string,
  title: string,

  user: {
    avatar_url: string,
    login: string
  },

  labels: [
    {
      id: number,
      name: string
    }
  ]


}


export interface FilterListProps {
  $active: number;
}


export interface FiltersObj {
  state: string,
  label: string,
  active: boolean
}