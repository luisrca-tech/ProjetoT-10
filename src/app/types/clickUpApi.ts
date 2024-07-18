//tipos das respostas que vou receber das reqs do clickup.
export type ClickUpApiCustomField = {};

interface Assignee {
  id: number;
  username: string;
  color: string;
  email: string;
  profilePicture: string | null;
}

export type CustomField = {
  id: string;
  name: string;
  type: string;
  type_config: {
    new_drop_down: boolean;
    options: {
      id: string;
      name: string;
      color: string | null;
      orderindex: number;
    };
  };
  date_created: string;
  hide_from_guests: boolean;
  required: boolean;
  value: string[];
};

interface Folder {
  id: string;
  name: string;
  hidden: boolean;
  access: boolean;
}

interface List {
  access: boolean;
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  hidden: boolean;
  access: boolean;
}

interface Sharing {
  public: boolean;
  public_share_expires_on: string | null;
  public_fields: any[];
  token: string | null;
  seo_optimized: boolean;
}

interface Space {
  id: string;
}

interface Status {
  color: string;
  id: string;
  orderindex: number;
  status: string;
  type: string;
}

interface Watcher {
  // Defina a estrutura do Watcher aqui
}

export interface Task {
  archived: boolean;
  assignees: Assignee[];
  checklists: any[];
  creator: Assignee;
  custom_fields: CustomField[];
  custom_id: string | null;
  custom_item_id: number;
  date_closed: string | null;
  date_created: string;
  date_done: string | null;
  date_updated: string;
  dependencies: any[];
  description: string;
  due_date: string;
  folder: Folder;
  group_assignees: any[];
  id: string;
  linked_tasks: any[];
  list: List;
  locations: any[];
  name: string;
  orderindex: string;
  parent: string | null;
  permission_level: string;
  points: number | null;
  priority: string | null;
  project: Project;
  sharing: Sharing;
  space: Space;
  start_date: string;
  status: Status;
  tags: any[];
  team_id: string;
  text_content: string;
  time_estimate: number | null;
  url: string;
  watchers: Watcher[];
}
