import {NextResponse} from "next/server";

export type ApiError = {
    statusCode: number
    message: string
    code: string
    details?: any
}

export class ApiErrors {
    static ERRORS = {
        NOT_FOUND: {
            statusCode: 404,
            message: 'Zasób nie został znaleziony',
            code: 'NOT_FOUND'
        },
        UNAUTHORIZED: {
            statusCode: 401,
            message: 'Nieautoryzowany dostęp',
            code: 'UNAUTHORIZED'
        },
        INVALID_CREDENTIALS: {
            statusCode: 401,
            message: 'Nieprawidłowy email lub hasło',
            code: 'INVALID_CREDENTIALS'
        },
        METHOD_NOT_ALLOWED: {
            statusCode: 405,
            message: 'Metoda niedozwolona',
            code: 'METHOD_NOT_ALLOWED'
        },
        BAD_REQUEST: {
            statusCode: 400,
            message: 'Nieprawidłowe żądanie',
            code: 'BAD_REQUEST'
        },
        FORBIDDEN: {
            statusCode: 403,
            message: 'Dostęp zabroniony',
            code: 'FORBIDDEN'
        },
        INTERNAL_ERROR: {
            statusCode: 500,
            message: 'Wewnętrzny błąd serwera',
            code: 'INTERNAL_ERROR'
        },
        VALIDATION_ERROR: {
            statusCode: 400,
            message: 'Błąd walidacji',
            code: 'VALIDATION_ERROR'
        },
        USER_ALREADY_EXISTS: {
            statusCode: 400,
            message: 'Użytkownik już istnieje',
            code: 'USER_ALREADY_EXISTS'
        }
    } as const;

    static sendError(
        error: keyof typeof ApiErrors.ERRORS,
        details?: any
    ) {
        const errorConfig = this.ERRORS[error]
        return NextResponse.json(
            {
                error: {
                    ...errorConfig,
                    details,
                },
            },
            {
                status: errorConfig.statusCode,
            }
        );
    }

    static customError(
        statusCode: number,
        message: string,
        code: string,
        details?: any
    ) {
        return NextResponse.json(
            {
                error: {
                    statusCode,
                    message,
                    code,
                    details,
                },
            },
            {
                status: statusCode,
            }
        );
    }
}