// examApi.test.js
import { test} from 'vitest';
import { ExamServiceHelp } from '@/service/ExamServiceHelp';

test('GET /exams returns a list of exams', async () => {
  const response = ExamServiceHelp.getExams();
  const data = await response.json();

  // Erwartete Antwort: Ein Array von 
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);

  // Überprüfen, ob jedes Buch ein Titel und einen Autor hat
  data.forEach((exam) => {
    expect(exam.name).toBeDefined();
    expect(exam.studentGroupId).toBeDefined();
  });
});