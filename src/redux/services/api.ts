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
    machineControllerCreate: build.mutation<
      MachineControllerCreateApiResponse,
      MachineControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/machine`,
        method: "POST",
        body: queryArg.createMachineDto,
      }),
    }),
    machineControllerFindAll: build.query<
      MachineControllerFindAllApiResponse,
      MachineControllerFindAllApiArg
    >({
      query: () => ({ url: `/api/machine` }),
    }),
    machineControllerFindOne: build.query<
      MachineControllerFindOneApiResponse,
      MachineControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/api/machine/${queryArg.id}` }),
    }),
    machineControllerUpdate: build.mutation<
      MachineControllerUpdateApiResponse,
      MachineControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/machine/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateMachineDto,
      }),
    }),
    machineControllerRemove: build.mutation<
      MachineControllerRemoveApiResponse,
      MachineControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/machine/${queryArg.id}`,
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
    hardwareActionControllerCreateQrCode: build.mutation<
      HardwareActionControllerCreateQrCodeApiResponse,
      HardwareActionControllerCreateQrCodeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/qrCode/createQrCode`,
        method: "POST",
        body: queryArg.createQrCodeDto,
      }),
    }),
    hardwareActionControllerCreateRfid: build.mutation<
      HardwareActionControllerCreateRfidApiResponse,
      HardwareActionControllerCreateRfidApiArg
    >({
      query: (queryArg) => ({
        url: `/api/qrCode/createRFID`,
        method: "POST",
        body: queryArg.createRfidDto,
      }),
    }),
    mesControllerFindAllRecord: build.query<
      MesControllerFindAllRecordApiResponse,
      MesControllerFindAllRecordApiArg
    >({
      query: () => ({ url: `/api/mes` }),
    }),
    mesControllerFindAllRecordByMachineAndDateTime: build.query<
      MesControllerFindAllRecordByMachineAndDateTimeApiResponse,
      MesControllerFindAllRecordByMachineAndDateTimeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/mes/machineDateTime`,
        params: {
          machineId: queryArg.machineId,
          startTime: queryArg.startTime,
          endTime: queryArg.endTime,
        },
      }),
    }),
    mesControllerGetDailyLineChartData: build.query<
      MesControllerGetDailyLineChartDataApiResponse,
      MesControllerGetDailyLineChartDataApiArg
    >({
      query: (queryArg) => ({
        url: `/api/mes/dailyLineChartData`,
        params: { machineId: queryArg.machineId, time: queryArg.time },
      }),
    }),
    mesControllerFindOneRecord: build.query<
      MesControllerFindOneRecordApiResponse,
      MesControllerFindOneRecordApiArg
    >({
      query: (queryArg) => ({ url: `/api/mes/${queryArg.moduleSerialNo}` }),
    }),
    monitorServiceManagerControllerGetMachineState: build.query<
      MonitorServiceManagerControllerGetMachineStateApiResponse,
      MonitorServiceManagerControllerGetMachineStateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/monitor`,
        params: { machineId: queryArg.machineId },
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
export type MachineControllerCreateApiResponse =
  /** status 201 The machine has been successfully created. */ Machine;
export type MachineControllerCreateApiArg = {
  createMachineDto: CreateMachineDto;
};
export type MachineControllerFindAllApiResponse =
  /** status 200 Array of machines retrieved successfully. */ Machine[];
export type MachineControllerFindAllApiArg = void;
export type MachineControllerFindOneApiResponse =
  /** status 200 Single machine retrieved successfully. */ Machine;
export type MachineControllerFindOneApiArg = {
  id: string;
};
export type MachineControllerUpdateApiResponse =
  /** status 200 The machine has been successfully updated. */ Machine;
export type MachineControllerUpdateApiArg = {
  id: string;
  updateMachineDto: UpdateMachineDto;
};
export type MachineControllerRemoveApiResponse = unknown;
export type MachineControllerRemoveApiArg = {
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
  /** Filter shifts by machine ID */
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
export type HardwareActionControllerCreateQrCodeApiResponse =
  /** status 201 The QR code has been created. */ Qrcode;
export type HardwareActionControllerCreateQrCodeApiArg = {
  createQrCodeDto: CreateQrCodeDto;
};
export type HardwareActionControllerCreateRfidApiResponse =
  /** status 201 The RFID entry has been created. */ Rfid;
export type HardwareActionControllerCreateRfidApiArg = {
  createRfidDto: CreateRfidDto;
};
export type MesControllerFindAllRecordApiResponse =
  /** status 200 Array of all finded Record. */ Record[];
export type MesControllerFindAllRecordApiArg = void;
export type MesControllerFindAllRecordByMachineAndDateTimeApiResponse =
  /** status 200 list of found record matched query. */ Record[];
export type MesControllerFindAllRecordByMachineAndDateTimeApiArg = {
  /** Filter record by machine ID */
  machineId: number;
  /** Filter records by start date and time */
  startTime?: string;
  /** Filter records by end date and time */
  endTime?: string;
};
export type MesControllerGetDailyLineChartDataApiResponse =
  /** status 200 Data for daily record line chart */ number[];
export type MesControllerGetDailyLineChartDataApiArg = {
  /** Filter record by machine ID */
  machineId: number;
  /** time of day */
  time: string;
};
export type MesControllerFindOneRecordApiResponse =
  /** status 200 Single message retrieved successfully. */ Record;
export type MesControllerFindOneRecordApiArg = {
  moduleSerialNo: string;
};
export type MonitorServiceManagerControllerGetMachineStateApiResponse = unknown;
export type MonitorServiceManagerControllerGetMachineStateApiArg = {
  /** Filter record by machine ID */
  machineId: number;
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
export type Machine = {
  /** The unique identifier of the machine */
  id: number;
  /** System ID of the machine */
  systemID: string;
  /** Line ID of the machine */
  lineID: string;
  /** Name of the station in the machine */
  stationName: string;
  /** Station ID in the machine */
  stationID: string;
  /** Description of the machine */
  description: string;
  /** IP address of the machine */
  ip: string;
  /** Creation date of the machine record */
  createdAt: string;
  /** Last update date of the machine record */
  updatedAt: string;
  /** Deletion date of the machine record */
  deletedAt: string | null;
};
export type CreateMachineDto = {
  systemID: string;
  lineID: string;
  stationName: string;
  stationID: string;
  description: string;
  ip: string;
};
export type UpdateMachineDto = {
  systemID: string;
  lineID: string;
  stationName: string;
  stationID: string;
  description: string;
  ip: string;
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
export type PartialType = {};
export type CreateShiftDto = {
  shiftName: string;
  startTime: string;
  endTime: string;
  /** The machine where the shift is assigned */
  machine: PartialType;
};
export type UpdateShiftDto = {
  shiftName?: string;
  startTime?: string;
  endTime?: string;
  machineId?: number;
};
export type Qrcode = {
  /** The unique identifier of the machine */
  id: number;
  /** barcode scan by the system */
  code: string;
  /** The machine associated with this QR code */
  machine: Machine;
  /** Scan date of the code */
  createdAt: string;
};
export type CreateQrCodeDto = {
  /** barcode scan by the system */
  code: string;
  /** The machine where the QR code is generated */
  machine: PartialType;
};
export type Rfid = {
  /** The unique identifier of the RFID tag */
  id: number;
  /** The RFID tag scanned by the system */
  rfidTag: string;
  /** The machine associated with this QR code */
  machine: Machine;
  /** Scan date of the RFID tag */
  createdAt: string;
};
export type CreateRfidDto = {
  /** rfid scan by the system */
  code: string;
  /** The machine where the QR code is generated */
  machine: PartialType;
};
export type RecordData = {
  /** The OPID of the record data */
  OPID: string;
  /** The value of CurDta_QD01 */
  CurDta_QD01: number;
  /** The value of CurDta_QD02 */
  CurDta_QD02: number;
  /** The value of CurDta_QD03 */
  CurDta_QD03: number;
  /** The value of CurDta_QD04 */
  CurDta_QD04: number;
  /** The value of PrvDta1_QD01 */
  PrvDta1_QD01: number;
  /** The value of PrvDta1_QD02 */
  PrvDta1_QD02: number;
  /** The value of PrvDta1_QD03 */
  PrvDta1_QD03: number;
  /** The value of PrvDta1_QD04 */
  PrvDta1_QD04: number;
  /** The value of PrvDta2_QD01 */
  PrvDta2_QD01: number;
  /** The value of PrvDta2_QD02 */
  PrvDta2_QD02: number;
  /** The value of PrvDta2_QD03 */
  PrvDta2_QD03: number;
  /** The value of PrvDta2_QD04 */
  PrvDta2_QD04: number;
  /** The value of TryCnt */
  TryCnt: number;
  /** The value of RT */
  RT: number;
  /** The value of OType */
  OType: number;
  /** The minimum value of QD01 */
  QD01_Min: number;
  /** The maximum value of QD01 */
  QD01_Max: number;
  /** The minimum value of QD02 */
  QD02_Min: number;
  /** The maximum value of QD02 */
  QD02_Max: number;
  /** The minimum value of QD03 */
  QD03_Min: number;
  /** The maximum value of QD03 */
  QD03_Max: number;
  /** The minimum value of QD04 */
  QD04_Min: number;
  /** The maximum value of QD04 */
  QD04_Max: number;
  /** The name of the operator */
  OperatorName: string;
  /** The additional text */
  OPTxt: string;
};
export type Record = {
  /** Serial number of the record */
  moduleSerialNo: string;
  /** Date time of the record */
  systemDt: string;
  /** Result of the record: 1:ok, 2:ng */
  result: number;
  /** The machine of the record */
  machine: Machine;
  /** The record data of the record */
  recordDatas: RecordData[];
  /** Creation date of the machine record */
  createdAt: string;
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
  useMachineControllerCreateMutation,
  useMachineControllerFindAllQuery,
  useMachineControllerFindOneQuery,
  useMachineControllerUpdateMutation,
  useMachineControllerRemoveMutation,
  useShiftControllerCreateMutation,
  useShiftControllerFindAllQuery,
  useShiftControllerFindOneQuery,
  useShiftControllerUpdateMutation,
  useShiftControllerRemoveMutation,
  useHardwareActionControllerCreateQrCodeMutation,
  useHardwareActionControllerCreateRfidMutation,
  useMesControllerFindAllRecordQuery,
  useMesControllerFindAllRecordByMachineAndDateTimeQuery,
  useMesControllerGetDailyLineChartDataQuery,
  useMesControllerFindOneRecordQuery,
  useMonitorServiceManagerControllerGetMachineStateQuery,
} = injectedRtkApi;
