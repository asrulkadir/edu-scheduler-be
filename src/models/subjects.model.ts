export class SubjectsResponse {
  id: string;
  name: string;
  description: string;
  clientId: string;
  teacher?: {
    id: string;
    name: string;
  }[];
}

export class CreateSubjectsRequest {
  name: string;
  description: string;
  clientId: string;
  teacher?: string[];
}

export class UpdateSubjectsRequest {
  id: string;
  clientId: string;
  name?: string;
  description?: string;
  teacher?: string[];
}
