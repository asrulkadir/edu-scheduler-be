export class SubjectsResponse {
  id: string;
  name: string;
  description: string;
  clientId: string;
  teachers?: {
    id: string;
    name: string;
  }[];
}

export class CreateSubjectsRequest {
  name: string;
  description: string;
  clientId: string;
  teachers?: string[];
}

export class UpdateSubjectsRequest {
  id: string;
  clientId: string;
  name?: string;
  description?: string;
  teachers?: string[];
}
