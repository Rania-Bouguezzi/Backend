import { IsBoolean, IsDate, IsDateString, IsEmail, IsIn, IsNumber, IsString } from "class-validator";
import { GenreType, UserType, typeStatus } from "src/Type/Type";

export class CreateUser {
    id: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsDateString() // (YYYY-MM-DD)
    birthDate: string;

//    @IsString()
    picture?: string;

    @IsString()
    address: string;

   // @IsIn(Object.values(UserType))
    role: UserType;

    @IsIn(Object.values(GenreType))
    genre: string;

   // @IsString()
    facebookKey?: string;

  //  @IsString()
    profile?: string;

   // @IsBoolean()
    enableOauth?: boolean = true;

   // @IsNumber()
    sessionTimeout?: number = 0;

   // @IsBoolean()
    multipleSession?: boolean = true;

   // @IsBoolean()
    phoneValidated?: boolean = true;

   // @IsString()
    phoneValidationCode?: string;

  //  @IsBoolean()
    emailValidated?: boolean = true;

   // @IsString()
    emailValidationCode?: string;

  //  @IsString()
    authenticationMode?: string;

   // @IsBoolean()
    enabled?: boolean = true;

   // @IsString()
    confirmationToken?: string;

  //  @IsDateString()
    passwordRequestedAt?: string;

 //   @IsBoolean()
    locked?: boolean = true;

  //  @IsBoolean()
    expired?: boolean = true;

 //   @IsDateString()
    expiresAt?: string;

  //  @IsBoolean()
    credentialsExpired?: boolean = true;

  //  @IsDateString()
    credentialsExpireAt?: string;

  //  @IsDateString()
    lastLogin?: string;

  //  @IsDateString()
    lastFailedLogin?: string;

  //  @IsNumber()
    loginCount?: number = 0;

   // @IsNumber()
    failedLoginCount?: number = 0;

  //  @IsNumber()
    lastFailedLoginCount?: number = 0;

    @IsDateString()
    dateCreation: string = new Date().toISOString();

    @IsDateString()
    dateUpdate: string = new Date().toISOString();

   // @IsIn(Object.values(typeStatus))
    status?: typeStatus;
}
