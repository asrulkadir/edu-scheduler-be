export class WebResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: string;
  paging?: Paging;
}

export class Paging {
  size: number;
  total_page: number;
  current_page: number;
}
