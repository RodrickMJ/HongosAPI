export default interface AuthResponse {
  data: {
    id: string
    name: string;
    email: string;
  };

  token: string;
}
