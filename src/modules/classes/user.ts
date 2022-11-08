import store from "@/store";
import {
  setIsAuthenticated,
  setRoles as userSetRoles,
  clear,
  setRolesData as userSetRolesData,
  setUserData as userSetUserData,
  rolesData,
} from "@/modules/reducers/userReducer";

interface IUser {
  isAuthenticated?: boolean;
  roles?: Array<string>;
  setIsAuthenticated: (value: boolean) => void;
  getIsAuthenticated: () => boolean;
  resetIsAuthenticated: () => void;
  getRolesData: () => rolesData[];
  setRolesData: () => void;
  clearUserData: () => void;
  setRoles: () => void;
  setUserData: () => void;
  getRoles: () => string | Array<string>;
}

/**
 * The User class defines the `getInstance` method that lets clients access
 * the unique User instance.
 */
export default class User {
  private static instance: User;


  /**
   * User's constructor is private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor(user?: IUser) {
    User.instance = user;
  }

  /**
   * The static method that controls the access to the User instance.
   */
  public static getUser(): User {
    if (!User.instance) User.instance = new User();
    return User.instance;
  }

  /**
   * used to persist user authentication to the user reducer
   * @param value true | false
   */
  public setIsAuthenticated(value: boolean) {
    store.dispatch(setIsAuthenticated({ isAuthenticated: value }));
  }

  /**
   * function that returns user authentication status as a boolean
   */
  public getIsAuthenticated() {
    return store.getState().user.isAuthenticated;
  }

  /**
   * method that remove the user's authentication from store
   */
  public resetIsAuthenticated() {
    store.dispatch(setIsAuthenticated({ isAuthenticated: false }));
  }

  /**
   * clear user information in store
   */
  public clearUserData() {
    store.dispatch(clear());
  }

  /**
   * persist roles to the store
   */
  public setRoles(roles: string | Array<string>) {
    if (!roles || roles.length === 0) return;
    store.dispatch(userSetRoles({ roles }));
  }

  /**
   * persist roles data to the store
   */
  public setRolesData(rolesData: { id: number; label: string }[]) {
    if (!rolesData || Object.keys(rolesData).length === 0) return;
    store.dispatch(userSetRolesData({ rolesData }));
  }

  /**
   * persist user data to the store
   */
  public setUserData(userData: { id: number; label: string }[]) {
    if (!userData || Object.keys(userData).length === 0) return;
    store.dispatch(userSetUserData({ userData }));
  }

  /**
   * get roles from the store
   */
  public getRoles() {
    return store.getState().user.roles;
  }

  /**
   * get roles data from the store
   */
  public getRolesData() {
    return store.getState().user.rolesData;
  }
}
