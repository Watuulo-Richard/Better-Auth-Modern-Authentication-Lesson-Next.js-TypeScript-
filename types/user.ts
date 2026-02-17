import { UserRole } from "@/lib/generated/prisma/enums";

export type UserTypes = {
  id               :string;
  firstName        :string;
  lastName         :string;
  name             :string;
  phone            :string | null;
  role             :UserRole;
  email            :string;
  emailVerified    :boolean;
  phoneVerified    :boolean;
  physicalVerified :boolean;
  image            :string | null;
  createdAt        :Date;
  updatedAt        :Date;
}

export type CreateReactQueryUserTypes = Omit<UserTypes, "id" | "createdAt" | "updatedAt">;

export type UpdateReactQueryUserTypes = Partial<UserTypes>;

// Query Response For Getting All Categories
export type QueriesUserTypesResponse = {
	success: boolean;
    statusCode: number;
	data: UserTypes[] | [];
	message: string;
	error: string | null;
};

// Query Response For Creating Category
export type MutationCreateReactQueryUserTypesResponse = {
    success: boolean;
    statusCode: number;
	data: CreateReactQueryUserTypes | null;
	error: string | null;
	message: string;
};

// Query Response For Updating Category
export type MutationUpdateReactQueryUserTypesResponse = {
    success: boolean;
    statusCode: number;
	data: UpdateReactQueryUserTypes | null;
	error: string | null;
	message: string;
};

// For Single ReactQueryCategory Response
export type SingleReactQueryUserTypesResponse = {
    success: boolean;
    statusCode: number;
	data: UserTypes | null;
	error: string | null;
	message: string;
};
