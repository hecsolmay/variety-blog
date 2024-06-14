export const MESSAGES = {
  DEFAULT_STRING: 'Por favor llene este campo',
  MIN_USERNAME_LENGTH: 'El nombre del usuario debe tener al menos 3 caracteres',
  MAX_USERNAME_LENGTH:
    'El nombre del usuario debe tener al menos 20 caracteres',
  PASSWORD_LENGTH: 'La contraseña debe tener al menos 6 caracteres',
  MAX_EMAIL_LENGTH: 'El email debe tener menos de 254 caracteres',
  EMAIL_FORMAT: 'El email debe ser válido',
  PASSWORD_CONFIRMATION: 'Las contraseñas no coinciden',
  USERNAME_ALREADY_EXISTS: 'El nombre de usuario ya existe',
  EMAIL_ALREADY_EXISTS: 'El email ya existe',
  NO_EMPTY_FIELDS: 'El campo no puede estar vacío',
  MIN_COMMENT_LENGTH: 'El comentario debe tener al menos 10 caracteres',
  MAX_COMMENT_LENGTH: 'El comentario debe tener menos de 250 caracteres'
} as const

export const DEFAULT_STRING_MESSAGE = {
  invalid_type_error: 'El campo debe ser de tipo string',
  invalid_format_error: 'El campo debe tener un formato válido',
  required_error: 'El campo es obligatorio',
  message: 'Por favor llene este campo'
}
