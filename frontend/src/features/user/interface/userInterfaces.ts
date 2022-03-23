export interface authState {
	user: User | null;
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: string | null;
  }
  
  export interface User {
	name?: string | null;
	userName: string | null;
	password: string | null;
	token?: string;
  }