export enum USER_ROLE_TYPE{
    SIMPLE = 'simple',
    ADMIN = 'admin',
    MANAGER = 'manager'
}

export interface IUser {
    isModified(arg0: string): unknown;
    username: string;
    email: string;
    hashedPassword: string;
    role: USER_ROLE_TYPE
    createdAt: Date;
    updatedAt: Date;

    comparePassword(password: string): Promise<boolean>;
}