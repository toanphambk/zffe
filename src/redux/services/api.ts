import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    usersControllerCreate: build.mutation<
      UsersControllerCreateApiResponse,
      UsersControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/users`,
        method: "POST",
        body: queryArg.createUserDto,
      }),
    }),
    usersControllerFindAll: build.query<
      UsersControllerFindAllApiResponse,
      UsersControllerFindAllApiArg
    >({
      query: (queryArg) => ({
        url: `/api/users`,
        params: { page: queryArg.page, limit: queryArg.limit },
      }),
    }),
    usersControllerFindOne: build.query<
      UsersControllerFindOneApiResponse,
      UsersControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/api/users/${queryArg.id}` }),
    }),
    usersControllerUpdate: build.mutation<
      UsersControllerUpdateApiResponse,
      UsersControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/users/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateUserDto,
      }),
    }),
    usersControllerRemove: build.mutation<
      UsersControllerRemoveApiResponse,
      UsersControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/users/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    filesControllerUploadFile: build.mutation<
      FilesControllerUploadFileApiResponse,
      FilesControllerUploadFileApiArg
    >({
      query: (queryArg) => ({
        url: `/api/files/upload`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    filesControllerDownload: build.query<
      FilesControllerDownloadApiResponse,
      FilesControllerDownloadApiArg
    >({
      query: (queryArg) => ({ url: `/api/files/${queryArg.path}` }),
    }),
    authControllerLogin: build.mutation<
      AuthControllerLoginApiResponse,
      AuthControllerLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/email/login`,
        method: "POST",
        body: queryArg.authEmailLoginDto,
      }),
    }),
    authControllerAdminLogin: build.mutation<
      AuthControllerAdminLoginApiResponse,
      AuthControllerAdminLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/admin/email/login`,
        method: "POST",
        body: queryArg.authEmailLoginDto,
      }),
    }),
    authControllerRegister: build.mutation<
      AuthControllerRegisterApiResponse,
      AuthControllerRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/email/register`,
        method: "POST",
        body: queryArg.authRegisterLoginDto,
      }),
    }),
    authControllerConfirmEmail: build.mutation<
      AuthControllerConfirmEmailApiResponse,
      AuthControllerConfirmEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/email/confirm`,
        method: "POST",
        body: queryArg.authConfirmEmailDto,
      }),
    }),
    authControllerForgotPassword: build.mutation<
      AuthControllerForgotPasswordApiResponse,
      AuthControllerForgotPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/forgot/password`,
        method: "POST",
        body: queryArg.authForgotPasswordDto,
      }),
    }),
    authControllerResetPassword: build.mutation<
      AuthControllerResetPasswordApiResponse,
      AuthControllerResetPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/reset/password`,
        method: "POST",
        body: queryArg.authResetPasswordDto,
      }),
    }),
    authControllerMe: build.query<
      AuthControllerMeApiResponse,
      AuthControllerMeApiArg
    >({
      query: () => ({ url: `/api/auth/me` }),
    }),
    authControllerUpdate: build.mutation<
      AuthControllerUpdateApiResponse,
      AuthControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/me`,
        method: "PATCH",
        body: queryArg.authUpdateDto,
      }),
    }),
    authControllerDelete: build.mutation<
      AuthControllerDeleteApiResponse,
      AuthControllerDeleteApiArg
    >({
      query: () => ({ url: `/api/auth/me`, method: "DELETE" }),
    }),
    homeControllerAppInfo: build.query<
      HomeControllerAppInfoApiResponse,
      HomeControllerAppInfoApiArg
    >({
      query: () => ({ url: `/` }),
    }),
    productionLineControllerCreate: build.mutation<
      ProductionLineControllerCreateApiResponse,
      ProductionLineControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/production-line`,
        method: "POST",
        body: queryArg.createProductionLineDto,
      }),
    }),
    productionLineControllerFindAll: build.query<
      ProductionLineControllerFindAllApiResponse,
      ProductionLineControllerFindAllApiArg
    >({
      query: () => ({ url: `/api/production-line` }),
    }),
    productionLineControllerFindOne: build.query<
      ProductionLineControllerFindOneApiResponse,
      ProductionLineControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/api/production-line/${queryArg.id}` }),
    }),
    productionLineControllerUpdate: build.mutation<
      ProductionLineControllerUpdateApiResponse,
      ProductionLineControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/production-line/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateProductionLineDto,
      }),
    }),
    productionLineControllerRemove: build.mutation<
      ProductionLineControllerRemoveApiResponse,
      ProductionLineControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/production-line/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    shiftControllerCreate: build.mutation<
      ShiftControllerCreateApiResponse,
      ShiftControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/shift`,
        method: "POST",
        body: queryArg.createShiftDto,
      }),
    }),
    shiftControllerFindAll: build.query<
      ShiftControllerFindAllApiResponse,
      ShiftControllerFindAllApiArg
    >({
      query: (queryArg) => ({ url: `/api/shift`, params: { id: queryArg.id } }),
    }),
    shiftControllerFindOne: build.query<
      ShiftControllerFindOneApiResponse,
      ShiftControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/api/shift/${queryArg.id}` }),
    }),
    shiftControllerUpdate: build.mutation<
      ShiftControllerUpdateApiResponse,
      ShiftControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/shift/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateShiftDto,
      }),
    }),
    shiftControllerRemove: build.mutation<
      ShiftControllerRemoveApiResponse,
      ShiftControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/shift/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    qrCodeControllerCreate: build.mutation<
      QrCodeControllerCreateApiResponse,
      QrCodeControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/qrCode`,
        method: "POST",
        body: queryArg.createQrCodeDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type UsersControllerCreateApiResponse = unknown;
export type UsersControllerCreateApiArg = {
  createUserDto: CreateUserDto;
};
export type UsersControllerFindAllApiResponse = unknown;
export type UsersControllerFindAllApiArg = {
  page: number;
  limit: number;
};
export type UsersControllerFindOneApiResponse = unknown;
export type UsersControllerFindOneApiArg = {
  id: string;
};
export type UsersControllerUpdateApiResponse = unknown;
export type UsersControllerUpdateApiArg = {
  id: number;
  updateUserDto: UpdateUserDto;
};
export type UsersControllerRemoveApiResponse = unknown;
export type UsersControllerRemoveApiArg = {
  id: number;
};
export type FilesControllerUploadFileApiResponse = unknown;
export type FilesControllerUploadFileApiArg = {
  body: {
    file?: Blob;
  };
};
export type FilesControllerDownloadApiResponse = unknown;
export type FilesControllerDownloadApiArg = {
  /** The file path */
  path: string;
};
export type AuthControllerLoginApiResponse = unknown;
export type AuthControllerLoginApiArg = {
  authEmailLoginDto: AuthEmailLoginDto;
};
export type AuthControllerAdminLoginApiResponse =
  /** status 200 Login successful */ LoginResponseType;
export type AuthControllerAdminLoginApiArg = {
  authEmailLoginDto: AuthEmailLoginDto;
};
export type AuthControllerRegisterApiResponse = unknown;
export type AuthControllerRegisterApiArg = {
  authRegisterLoginDto: AuthRegisterLoginDto;
};
export type AuthControllerConfirmEmailApiResponse = unknown;
export type AuthControllerConfirmEmailApiArg = {
  authConfirmEmailDto: AuthConfirmEmailDto;
};
export type AuthControllerForgotPasswordApiResponse = unknown;
export type AuthControllerForgotPasswordApiArg = {
  authForgotPasswordDto: AuthForgotPasswordDto;
};
export type AuthControllerResetPasswordApiResponse = unknown;
export type AuthControllerResetPasswordApiArg = {
  authResetPasswordDto: AuthResetPasswordDto;
};
export type AuthControllerMeApiResponse = unknown;
export type AuthControllerMeApiArg = void;
export type AuthControllerUpdateApiResponse = unknown;
export type AuthControllerUpdateApiArg = {
  authUpdateDto: AuthUpdateDto;
};
export type AuthControllerDeleteApiResponse = unknown;
export type AuthControllerDeleteApiArg = void;
export type HomeControllerAppInfoApiResponse = unknown;
export type HomeControllerAppInfoApiArg = void;
export type ProductionLineControllerCreateApiResponse =
  /** status 201 The production line has been successfully created. */ ProductionLine;
export type ProductionLineControllerCreateApiArg = {
  createProductionLineDto: CreateProductionLineDto;
};
export type ProductionLineControllerFindAllApiResponse =
  /** status 200 Array of production lines retrieved successfully. */ ProductionLine[];
export type ProductionLineControllerFindAllApiArg = void;
export type ProductionLineControllerFindOneApiResponse =
  /** status 200 Single production line retrieved successfully. */ ProductionLine;
export type ProductionLineControllerFindOneApiArg = {
  id: string;
};
export type ProductionLineControllerUpdateApiResponse =
  /** status 200 The production line has been successfully updated. */ ProductionLine;
export type ProductionLineControllerUpdateApiArg = {
  id: string;
  updateProductionLineDto: UpdateProductionLineDto;
};
export type ProductionLineControllerRemoveApiResponse = unknown;
export type ProductionLineControllerRemoveApiArg = {
  id: string;
};
export type ShiftControllerCreateApiResponse =
  /** status 201 Shift successfully created. */ Shift;
export type ShiftControllerCreateApiArg = {
  createShiftDto: CreateShiftDto;
};
export type ShiftControllerFindAllApiResponse =
  /** status 200 List of shifts. */ Shift[];
export type ShiftControllerFindAllApiArg = {
  /** Filter shifts by production line ID */
  id?: number;
};
export type ShiftControllerFindOneApiResponse =
  /** status 200 Shift found. */ Shift;
export type ShiftControllerFindOneApiArg = {
  id: number;
};
export type ShiftControllerUpdateApiResponse =
  /** status 200 Shift successfully updated. */ Shift;
export type ShiftControllerUpdateApiArg = {
  id: number;
  updateShiftDto: UpdateShiftDto;
};
export type ShiftControllerRemoveApiResponse = unknown;
export type ShiftControllerRemoveApiArg = {
  id: number;
};
export type QrCodeControllerCreateApiResponse =
  /** status 201 The QRcode scanned */ Qrcode;
export type QrCodeControllerCreateApiArg = {
  createQrCodeDto: CreateQrCodeDto;
};
export type FileEntity = {
  id: string;
};
export type Role = {
  id: number;
  name: string;
};
export type Status = {
  id: number;
  name: string;
};
export type CreateUserDto = {
  email: object;
  password: string;
  firstName: object;
  lastName: object;
  photo: FileEntity;
  role: Role;
  status: Status;
};
export type UpdateUserDto = {
  email?: object;
  password?: string;
  firstName?: object;
  lastName?: object;
  photo?: FileEntity;
  role?: Role;
  status?: Status;
};
export type AuthEmailLoginDto = {
  email: string;
  password: string;
};
export type User = {
  /** The unique identifier of the user */
  id: number;
  /** Email of the user */
  email: object | null;
  /** Authentication provider of the user */
  provider: string;
  /** Social ID of the user */
  socialId: object | null;
  /** First name of the user */
  firstName: object | null;
  /** Last name of the user */
  lastName: object | null;
  /** Photo file of the user */
  photo: FileEntity | null;
  /** Role of the user */
  role: Role | null;
  /** Status of the user */
  status: Status | null;
  /** Unique hash for the user */
  hash: object | null;
  /** Creation date of the user record */
  createdAt: string;
  /** Last update date of the user record */
  updatedAt: string;
  /** Deletion date of the user record */
  deletedAt: string | null;
};
export type LoginResponseType = {
  token: string;
  user: User;
};
export type AuthRegisterLoginDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
export type AuthConfirmEmailDto = {
  hash: string;
};
export type AuthForgotPasswordDto = {
  email: string;
};
export type AuthResetPasswordDto = {
  password: string;
  hash: string;
};
export type AuthUpdateDto = {
  photo: FileEntity;
  firstName: string;
  lastName: string;
  password: string;
  oldPassword: string;
};
export type ProductionLine = {
  /** The unique identifier of the production line */
  id: number;
  /** System ID of the production line */
  systemID: string;
  /** Line ID of the production line */
  lineID: string;
  /** Name of the station in the production line */
  stationName: string;
  /** Station ID in the production line */
  stationID: string;
  /** Description of the production line */
  description: string;
  /** IP address of the production line */
  ipAddress: string;
};
export type CreateProductionLineDto = {
  systemID: string;
  lineID: string;
  stationName: string;
  stationID: string;
  description: string;
  ipAddress: string;
};
export type UpdateProductionLineDto = {
  systemID: string;
  lineID: string;
  stationName: string;
  stationID: string;
  description: string;
  ipAddress: string;
};
export type Shift = {
  /** The unique identifier of the shift */
  id: number;
  /** Name of the shift */
  shiftName: string;
  /** Start time of the shift */
  startTime: string;
  /** End time of the shift */
  endTime: string;
};
export type CreateShiftDto = {
  shiftName: string;
  startTime: string;
  endTime: string;
  productionLine: object;
};
export type UpdateShiftDto = {
  shiftName?: string;
  startTime?: string;
  endTime?: string;
  productionLineId?: number;
};
export type Qrcode = {
  /** The unique identifier of the production line */
  id: number;
  /** barcode scan by the system */
  code: string;
  /** Scan date of the code */
  createdAt: string;
};
export type CreateQrCodeDto = {
  /** barcode scan by the system */
  code: string;
};
export const {
  useUsersControllerCreateMutation,
  useUsersControllerFindAllQuery,
  useUsersControllerFindOneQuery,
  useUsersControllerUpdateMutation,
  useUsersControllerRemoveMutation,
  useFilesControllerUploadFileMutation,
  useFilesControllerDownloadQuery,
  useAuthControllerLoginMutation,
  useAuthControllerAdminLoginMutation,
  useAuthControllerRegisterMutation,
  useAuthControllerConfirmEmailMutation,
  useAuthControllerForgotPasswordMutation,
  useAuthControllerResetPasswordMutation,
  useAuthControllerMeQuery,
  useAuthControllerUpdateMutation,
  useAuthControllerDeleteMutation,
  useHomeControllerAppInfoQuery,
  useProductionLineControllerCreateMutation,
  useProductionLineControllerFindAllQuery,
  useProductionLineControllerFindOneQuery,
  useProductionLineControllerUpdateMutation,
  useProductionLineControllerRemoveMutation,
  useShiftControllerCreateMutation,
  useShiftControllerFindAllQuery,
  useShiftControllerFindOneQuery,
  useShiftControllerUpdateMutation,
  useShiftControllerRemoveMutation,
  useQrCodeControllerCreateMutation,
} = injectedRtkApi;
