// Валидация ИНН Юридического лица (10 цифр) - 7727563778
export const validateINNLegal = inn => {
  const s = String(inn);
  if (!/^\d{10}$/.test(s)) return false;

  const coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8];
  let n = 0;
  for (let i = 0; i < coefficients.length; i++) {
    n += coefficients[i] * Number(s[i]);
  }
  const checkDigit = (n % 11) % 10;
  return checkDigit === Number(s[9]);
};

// Валидация ИНН Физического лица или ИП (12 цифр) - 520205004556
export const validateINNIndividual = inn => {
  const s = String(inn);
  if (!/^\d{12}$/.test(s)) return false;

  const checkDigit = (digits, coefficients) => {
    let n = 0;
    for (let i = 0; i < coefficients.length; i++) {
      n += coefficients[i] * Number(digits[i]);
    }
    return (n % 11) % 10;
  };

  const n1 = checkDigit(s, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
  const n2 = checkDigit(s, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);

  return n1 === Number(s[10]) && n2 === Number(s[11]);
};

// Общая функция для инпута (автоматически определяет тип по длине)
export const validateINN = inn => {
  const s = String(inn || '');
  if (s.length === 10) return validateINNLegal(s);
  if (s.length === 12) return validateINNIndividual(s);
  return false;
};

// 083 367 324 77
export const validateSNILS = snils => {
  const s = String(snils || '').replace(/\D/g, '');

  if (s.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(s)) return false;

  const checkSum = parseInt(s.slice(9), 10);
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(s[i], 10) * (9 - i);
  }

  const calculateCheckSum = sum => {
    if (sum < 100) return sum;
    if (sum === 100 || sum === 101) return 0;
    return calculateCheckSum(sum % 101);
  };

  return calculateCheckSum(sum) === checkSum;
};

//  Универсальная валидация военного билета - Разрешает 1-2 буквы кириллицы и 6-8 цифр
export const validateMilitaryID = val => {
  const s = String(val || '')
    .replace(/\s/g, '')
    .toUpperCase();
  // Регулярка: 1-2 русские буквы и 6-8 цифр
  const regex = /^[А-ЯЁ]{1,2}\d{6,8}$/;
  return regex.test(s);
};

// Вспомогательные функции для динамических расчетов
const getLimits = () => {
  const now = new Date();
  const year = now.getFullYear();
  const maxAge = 120;
  return {
    now,
    currentYear: year,
    currentMonth: now.getMonth() + 1,
    currentDay: now.getDate(),
    minYear: year - maxAge,
  };
};

const checkYear = (y, future = false) => {
  const { currentYear, minYear } = getLimits();
  return /^\d{4}$/.test(String(y)) && y >= minYear && ((!future && y <= currentYear) || future);
};

const checkMonth = (m, y) => {
  const { currentYear, currentMonth } = getLimits();
  if (!m || m < 1 || m > 12) return false;
  if (Number(y) === currentYear && m > currentMonth) return false;
  return true;
};

const checkDay = (d, m, y) => {
  const { now } = getLimits();
  if (!d || d < 1 || d > 31) return false;
  const date = new Date(y, m - 1, d);
  return (
    date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d && date <= now
  );
};

// ГГГГ
export const validateYear = (val, future = false) => {
  return checkYear(Number(val), future);
};

// ММ.ГГГГ
export const validateMonthYear = val => {
  const [m, y] = val.split('.').map(Number);
  return checkYear(y) && checkMonth(m, y);
};

// ДД.ММ.ГГГГ
export const validateDate = val => {
  const [d, m, y] = val.split('.').map(Number);
  return checkYear(y) && checkMonth(m, y) && checkDay(d, m, y);
};
