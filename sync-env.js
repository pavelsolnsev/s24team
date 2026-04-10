import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV_FILE_PATH = path.join(__dirname, '.env');
const EXAMPLE_PATH = path.join(__dirname, '.env.example');

try {
  if (!fs.existsSync(EXAMPLE_PATH)) {
    throw new Error(`Файл не найден: ${EXAMPLE_PATH}`);
  }

  if (fs.existsSync(ENV_FILE_PATH)) {
    console.log('ℹ️  .env уже существует — не перезаписываем. Удалите .env, чтобы создать из .env.example.');
    process.exit(0);
  }

  fs.copyFileSync(EXAMPLE_PATH, ENV_FILE_PATH);
  console.log('✅ Создан .env из .env.example');
} catch (e) {
  console.error('❌ Ошибка:', e.message);
  process.exit(1);
}
