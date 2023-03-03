interface ICrawler {
  id: string;

  name: string;

  auth_token: string;

  running_instances: number;

  created_at: Date;

  updated_at: Date;
}

export { ICrawler };
