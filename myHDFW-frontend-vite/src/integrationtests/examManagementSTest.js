const {Selector} = require("testcafe");

const addExam = '#add_exam';
const ExamSave = '#add_exam_save';
const cancelSaveExamDialog = '#add_exam_cancel';
const deleteExams = '#delete_exam';
const editExamColumn = '#table_exams tbody td button[id="edit_column"]';
const deleteExamColumn = '#table_exams tbody td button[id="delete_column"]';
const cancelDeleteExamDialog = '#cancel_delete_exam_dialog';
const deleteExamDialog = '#delete_exam_dialog';
const cancelDeleteExamsDialog = '#cancel_delete_exams_dialog';
const deleteExamsDialog = '#delete_exams_dialog';

const searchExams = '#search_exams';
const checkboxFirst = '#table_exams tbody td:nth-child(1) div';
const dataInTable = '#table_exams tbody td:nth-child(2)';
const lectureSelector = '#lecture_exam';
const dialogSelector = 'p-dialog-header';

const testExamAdd = 'Web Technologies and Applications';
const testExamCancel = 'Implementierung digitaler Geschäftsprozesse';
const testExamDelete = 'Entrepreneurship';
const testExamsDeleteOne = 'Marketing';
const testExamsDeleteTwo = 'Software Testing & DevOps';
const testExamEdit = 'Wirtschaftsrecht';
const testExamEditNew = 'Testvorlesung';


fixture('Prüfungs-Management - Create, Update and Delete')
        .page('http://localhost:5173/pruefungsverwaltung/');

test('Prüfung hinzufügen', async t => {
    await t
            .click(addExam)
            .typeText(lectureSelector, testExamAdd)
            .typeText('#study_group_exam'           , 'MFWS421A')
            .typeText('#lecture_exam'               , 'Wirtschaftsstatistik')
            .typeText('#lecturer_exam'              , 'Malzkorn')
            .typeText('#semester_exam'              , '2')
            .typeText('#start_date_exam'            , '01.01.2021')
            .typeText('#end_date_exam'              , '01.07.2021')
            .typeText('#form_of_examination_exam'   , 'Klausur')
            .typeText('#deadline_lecturer_exam'     , '31.12.2020')
            .click(ExamSave)
            .typeText(searchExams, testExamAdd, {replace: true})
            .expect(Selector(dataInTable).innerText).contains(testExamAdd);
});

test('Prüfung hinzufügen - Abbrechen', async t => {
    await t
            .click(addExam)
            .typeText(lectureSelector, testExamCancel)
            .click(cancelSaveExamDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchExams, testExamCancel, {replace: true})
            .expect(Selector(dataInTable).innerText).contains(testExamCancel);
});

test('Prüfung löschen', async t => {
    await t
            .typeText(searchExams, testExamDelete)
            .click(deleteExamColumn)
            .click(deleteExamDialog)
            .typeText(searchExams, testExamDelete, {replace: true})
            .expect(Selector(dataInTable).exists).notOk();
});

test('Prüfung löschen - Abbrechen', async t => {
    await t
            .typeText(searchExams, testExamCancel, {replace: true})
            .click(deleteExamColumn)
            .click(cancelDeleteExamDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchExams, testExamCancel, {replace: true})
            .expect(Selector(dataInTable).innerText).contains(testExamCancel);
});

test('Räume löschen', async t => {
    await t
            .typeText(searchExams, testExamsDeleteOne, {replace: true})
            .click(checkboxFirst)
            .typeText(searchExams, testExamsDeleteTwo, {replace: true})
            .click(checkboxFirst)
            .click(deleteExams)
            .click(deleteExamsDialog)
            .typeText(searchExams, testExamsDeleteOne, {replace: true})
            .expect(Selector(dataInTable).exists).notOk()
            .typeText(searchExams, testExamsDeleteTwo, {replace: true})
            .expect(Selector(dataInTable).exists).notOk();
});

test('Räume löschen - abbrechen', async t => {
    await t
            .typeText(searchExams, testExamCancel, {replace: true})
            .click(checkboxFirst)
            .click(deleteExams)
            .click(cancelDeleteExamsDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchExams, testExamCancel, {replace: true})
            .expect(Selector(dataInTable).innerText).contains(testExamCancel);
});

test('Prüfung bearbeiten', async t => {
    await t
            .typeText(searchExams, testExamEdit, {replace: true})
            .click(editExamColumn)
            .typeText(lectureSelector, testExamEditNew, {replace: true})
            .click(ExamSave)
            .typeText(searchExams, testExamEditNew, {replace: true})
            .expect(Selector(dataInTable).innerText).contains(testExamEditNew);
});

test('Prüfung bearbeiten - abbrechen', async t => {
    await t
            .typeText(searchExams, testExamCancel, {replace: true})
            .click(editExamColumn)
            .typeText(lectureSelector, testExamEditNew, {replace: true})
            .click(cancelSaveExamDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchExams, testExamCancel, {replace: true})
            .expect(Selector(dataInTable).innerText).contains(testExamCancel);
});