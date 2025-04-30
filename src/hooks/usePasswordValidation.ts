// hooks/usePasswordValidation.ts
import { useEffect, useState } from 'react';

export const usePasswordValidation = (password: string) => {
  const [requirements, setRequirements] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  const [strength, setStrength] = useState({
    score: 0,
    label: '',
  });

  useEffect(() => {
    const updatedRequirements = {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    setRequirements(updatedRequirements);

    const completedRequirements =
      Object.values(updatedRequirements).filter(Boolean).length;
    let score = 0;
    let label = '';

    if (password.length > 0) {
      if (completedRequirements <= 1) {
        score = 1;
        label = 'Fraca';
      } else if (completedRequirements <= 3) {
        score = 2;
        label = 'Média';
      } else if (completedRequirements === 4) {
        score = 3;
        label = 'Forte';
      } else {
        score = 4;
        label = 'Muito forte';
      }
    }

    setStrength({ score, label });
  }, [password]);

  return { requirements, strength };
};
