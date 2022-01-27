import axios from 'axios';
import { getNewBodyForUpload, hasFiles } from './fileUploadHelper';

export const useAxios = <TData, TVariables>(
  query: string
): ((variables?: TVariables) => Promise<TData>) => {
  // it is safe to call React Hooks here.
  // const { url, headers } = React.useContext(FetchParamsContext)
  const url = import.meta.env.VITE_API_URL;
  return async (variables?: TVariables) => {

    const hasFilesForUpload = hasFiles(variables);
    let body: unknown = { query, variables };
    if (hasFilesForUpload) {
      const formData = getNewBodyForUpload(variables, query);

      body = formData;
    }

    return axios.post<{ data: TData }>(url, body).then((res) => res.data.data);
  };
};
