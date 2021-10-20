
export interface ButtonStatus {
    success: null | boolean,
    message: string
}

export const EMAIL_SEND: ButtonStatus = {
    success: true,
    message: "Kod został wysłany na podany email"
};

export const ERROR: ButtonStatus = {
    success: false,
    message: "Coś poszło nie tak, przepraszamy."
};

export const UNCORRECT_EMAIL: ButtonStatus = {
    success: false,
    message: "Format adresu email jest niepoprawny."
};

export const NO_ADDRESS_PROVIDED: ButtonStatus = {
    success: null,
    message: "Wpisz adres email na który wysłać wiadomość."
};
