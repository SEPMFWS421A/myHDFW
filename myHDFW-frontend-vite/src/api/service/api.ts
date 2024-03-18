/* tslint:disable */
/* eslint-disable */
/**
 * myHDFW REST API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type {Configuration} from './configuration';
import type {AxiosInstance, AxiosPromise, RawAxiosRequestConfig} from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
    assertParamExists,
    createRequestFunction,
    DUMMY_BASE_URL,
    serializeDataIfNeeded,
    setApiKeyToObject,
    setBasicAuthToObject,
    setBearerAuthToObject,
    setOAuthToObject,
    setSearchParams,
    toPathString
} from './common';
import type {RequestArgs} from './base';
// @ts-ignore
import {BASE_PATH, BaseAPI, COLLECTION_FORMATS, operationServerMap, RequiredError} from './base';

/**
 *
 * @export
 * @interface Location
 */
export interface Location {
    /**
     *
     * @type {number}
     * @memberof Location
     */
    'id'?: number;
    /**
     *
     * @type {string}
     * @memberof Location
     */
    'name'?: string;
    /**
     *
     * @type {Set<Room>}
     * @memberof Location
     */
    'rooms'?: Set<Room>;
}

/**
 *
 * @export
 * @interface LoginRequest
 */
export interface LoginRequest {
    /**
     *
     * @type {string}
     * @memberof LoginRequest
     */
    'username'?: string;
    /**
     *
     * @type {string}
     * @memberof LoginRequest
     */
    'password'?: string;
}

/**
 *
 * @export
 * @interface Room
 */
export interface Room {
    /**
     *
     * @type {number}
     * @memberof Room
     */
    'id'?: number;
    /**
     *
     * @type {string}
     * @memberof Room
     */
    'name'?: string;
    /**
     *
     * @type {number}
     * @memberof Room
     */
    'capacity'?: number;
    /**
     *
     * @type {Location}
     * @memberof Room
     */
    'location'?: Location;
}

/**
 * AuthControllerApi - axios parameter creator
 * @export
 */
export const AuthControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {LoginRequest} loginRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login: async (loginRequest: LoginRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'loginRequest' is not null or undefined
            assertParamExists('login', 'loginRequest', loginRequest)
            const localVarPath = `/auth/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer Authentication required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(loginRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthControllerApi - functional programming interface
 * @export
 */
export const AuthControllerApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthControllerApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @param {LoginRequest} loginRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async login(loginRequest: LoginRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.login(loginRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AuthControllerApi.login']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * AuthControllerApi - factory interface
 * @export
 */
export const AuthControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AuthControllerApiFp(configuration)
    return {
        /**
         *
         * @param {LoginRequest} loginRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login(loginRequest: LoginRequest, options?: any): AxiosPromise<string> {
            return localVarFp.login(loginRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthControllerApi - object-oriented interface
 * @export
 * @class AuthControllerApi
 * @extends {BaseAPI}
 */
export class AuthControllerApi extends BaseAPI {
    /**
     *
     * @param {LoginRequest} loginRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthControllerApi
     */
    public login(loginRequest: LoginRequest, options?: RawAxiosRequestConfig) {
        return AuthControllerApiFp(this.configuration).login(loginRequest, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * LocationControllerApi - axios parameter creator
 * @export
 */
export const LocationControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllLocations: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/location`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer Authentication required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {number} locationId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLocation: async (locationId: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'locationId' is not null or undefined
            assertParamExists('getLocation', 'locationId', locationId)
            const localVarPath = `/location/{location_id}`
                    .replace(`{${"location_id"}}`, encodeURIComponent(String(locationId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer Authentication required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LocationControllerApi - functional programming interface
 * @export
 */
export const LocationControllerApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = LocationControllerApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllLocations(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllLocations(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['LocationControllerApi.getAllLocations']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         *
         * @param {number} locationId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getLocation(locationId: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Location>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getLocation(locationId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['LocationControllerApi.getLocation']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * LocationControllerApi - factory interface
 * @export
 */
export const LocationControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LocationControllerApiFp(configuration)
    return {
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllLocations(options?: any): AxiosPromise<string> {
            return localVarFp.getAllLocations(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {number} locationId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getLocation(locationId: number, options?: any): AxiosPromise<Location> {
            return localVarFp.getLocation(locationId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * LocationControllerApi - object-oriented interface
 * @export
 * @class LocationControllerApi
 * @extends {BaseAPI}
 */
export class LocationControllerApi extends BaseAPI {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LocationControllerApi
     */
    public getAllLocations(options?: RawAxiosRequestConfig) {
        return LocationControllerApiFp(this.configuration).getAllLocations(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @param {number} locationId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LocationControllerApi
     */
    public getLocation(locationId: number, options?: RawAxiosRequestConfig) {
        return LocationControllerApiFp(this.configuration).getLocation(locationId, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * RoomControllerApi - axios parameter creator
 * @export
 */
export const RoomControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @param {Room} room
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRoom: async (room: Room, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'room' is not null or undefined
            assertParamExists('createRoom', 'room', room)
            const localVarPath = `/room`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer Authentication required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(room, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {number} roomId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteRoom: async (roomId: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'roomId' is not null or undefined
            assertParamExists('deleteRoom', 'roomId', roomId)
            const localVarPath = `/room/{room_id}`
                    .replace(`{${"room_id"}}`, encodeURIComponent(String(roomId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer Authentication required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllRooms: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/room`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer Authentication required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         *
         * @param {number} roomId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRoom: async (roomId: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'roomId' is not null or undefined
            assertParamExists('getRoom', 'roomId', roomId)
            const localVarPath = `/room/{room_id}`
                    .replace(`{${"room_id"}}`, encodeURIComponent(String(roomId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = {method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer Authentication required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * RoomControllerApi - functional programming interface
 * @export
 */
export const RoomControllerApiFp = function (configuration?: Configuration) {
    const localVarAxiosParamCreator = RoomControllerApiAxiosParamCreator(configuration)
    return {
        /**
         *
         * @param {Room} room
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createRoom(room: Room, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Room>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createRoom(room, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RoomControllerApi.createRoom']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         *
         * @param {number} roomId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteRoom(roomId: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteRoom(roomId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RoomControllerApi.deleteRoom']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllRooms(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllRooms(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RoomControllerApi.getAllRooms']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         *
         * @param {number} roomId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getRoom(roomId: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Room>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getRoom(roomId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RoomControllerApi.getRoom']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * RoomControllerApi - factory interface
 * @export
 */
export const RoomControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RoomControllerApiFp(configuration)
    return {
        /**
         *
         * @param {Room} room
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRoom(room: Room, options?: any): AxiosPromise<Room> {
            return localVarFp.createRoom(room, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {number} roomId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteRoom(roomId: number, options?: any): AxiosPromise<void> {
            return localVarFp.deleteRoom(roomId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllRooms(options?: any): AxiosPromise<string> {
            return localVarFp.getAllRooms(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @param {number} roomId
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRoom(roomId: number, options?: any): AxiosPromise<Room> {
            return localVarFp.getRoom(roomId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * RoomControllerApi - object-oriented interface
 * @export
 * @class RoomControllerApi
 * @extends {BaseAPI}
 */
export class RoomControllerApi extends BaseAPI {
    /**
     *
     * @param {Room} room
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomControllerApi
     */
    public createRoom(room: Room, options?: RawAxiosRequestConfig) {
        return RoomControllerApiFp(this.configuration).createRoom(room, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @param {number} roomId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomControllerApi
     */
    public deleteRoom(roomId: number, options?: RawAxiosRequestConfig) {
        return RoomControllerApiFp(this.configuration).deleteRoom(roomId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomControllerApi
     */
    public getAllRooms(options?: RawAxiosRequestConfig) {
        return RoomControllerApiFp(this.configuration).getAllRooms(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     *
     * @param {number} roomId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomControllerApi
     */
    public getRoom(roomId: number, options?: RawAxiosRequestConfig) {
        return RoomControllerApiFp(this.configuration).getRoom(roomId, options).then((request) => request(this.axios, this.basePath));
    }
}



