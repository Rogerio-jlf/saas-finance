// constants/password.ts
export const PASSWORD_REQUIREMENTS = [
  { id: 'minLength', text: 'No mínimo 8 caracteres', regex: /.{8,}/ },
  { id: 'upperCase', text: 'Pelo menos uma letra maiúscula', regex: /[A-Z]/ },
  { id: 'lowerCase', text: 'Pelo menos uma letra minúscula', regex: /[a-z]/ },
  { id: 'number', text: 'Pelo menos um número', regex: /[0-9]/ },
  {
    id: 'special',
    text: 'Pelo menos um caractere especial',
    regex: /[!@#$%^&*(),.?":{}|<>]/,
  },
];
