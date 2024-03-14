import { api } from '@/services/api/api';
import { AxiosError, AxiosResponse } from 'axios';
import { ISignResult, ISignUpResult } from '@/data/interfaces/sign-result';
import { IBadRequestBodyDto } from '@/data/dtos/bad-request-body-dto';

const controller = 'auth/user';

export class AuthService {
  static async signIn(body: { email: string; password: string }) {
    return api
      .post(`${controller}/login`, body)
      .then(
        (r: AxiosResponse<ISignResult, AxiosError<IBadRequestBodyDto>>) =>
          r.data
      );
  }

  static async signUp(body: {
    email: string;
    firstName: string;
    password: string;
    signUpFrom: 'LOCAL';
  }) {
    return api
      .post(`${controller}/signup`, body)
      .then(
        (r: AxiosResponse<ISignUpResult, AxiosError<IBadRequestBodyDto>>) =>
          r.data
      );
  }
  static async googleSignInAndSignUp(body: {
    email: string;
    firstName: string;
    id: string;
  }) {
    return api
      .post(`${controller}/google`, body)
      .then(
        (r: AxiosResponse<ISignResult, AxiosError<IBadRequestBodyDto>>) =>
          r.data
      );
  }

  static async facebookignInAndSignUp(body: {
    email: string;
    firstName: string;
    id: string;
  }) {
    return api
      .post(`${controller}/facebook`, body)
      .then(
        (r: AxiosResponse<ISignResult, AxiosError<IBadRequestBodyDto>>) =>
          r.data
      );
  }
}
