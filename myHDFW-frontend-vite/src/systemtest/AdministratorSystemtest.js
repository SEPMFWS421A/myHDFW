import {ClientFunction, Selector} from 'testcafe';

const mainView = Selector('.mainView');
const roomMngmt = mainView.find('.Raumverwaltung');
const eventMngmt = mainView.find('.Eventverwaltung');
const examMngmt = mainView.find('.Prüfungsverwaltung');
const studentMngmt = mainView.find('.Studentenverwaltung');

const buttonAdministration = Selector('.sidebar-menu')
        .find('.p-menuitem')
        .withText('Administration');

const testStudent = 'jeff123@test.com';

fixture('Administrator Features')
        .page('http://localhost:5173/');

test('Administrator page requires login as administrator', async t => {
    const loginMenu = Selector('.p-dialog').find('.p-component');

    await t.click(buttonAdministration)
            .expect(loginMenu.exists).ok()
            .typeText('#username', 'admin')
            .typeText('#password', 'password')
            .click(loginMenu.find('.p-button'));
});

test('Administrator can access admin panel', async t => {
    await t.click(buttonAdministration)
            .expect(roomMngmt.exists).ok()
            .expect(eventMngmt.exists).ok()
            .expect(examMngmt.exists).ok()
            .expect(studentMngmt.exists).ok();
});

test('Administrator can register new rooms', async t => {
    const testRoom = 'T-5000';

    await t.click(buttonAdministration)
            .click(roomMngmt)
            .click('#add_room')
            .typeText('#designation_room', testRoom)
            .typeText('#capacity_room', '30')
            .typeText('#capacity_exam_room', '10')
            .typeText('#equipment_room', 'Beamer, Internet, Electricity')
            .typeText('#location_room', 'Mettmann')
            .click('#add_room_save')
            .typeText('#search_rooms', testRoom, {replace: true})
            .expect(Selector('#table_rooms tbody td:nth-child(2)').innerText).contains(testRoom);
});

test('Administrator can register new event', async t => {
    const testEvent = 'Business Knigge 0';

    await t.click(buttonAdministration)
            .click(eventMngmt)
            .click('#add_event')
            .typeText('#designation_event', testEvent)
            .typeText('#starting_point', '10:00')
            .typeText('#end_point', '12:30')
            .typeText('#capacity_event', '30')
            .typeText('#date', '17.02.2024')
            .typeText('#location_event', 'Mettmann')
            .click('#add_event_save')
            .typeText('#search_events', testEvent, {replace: true})
            .expect(Selector('#table_events tbody td:nth-child(2)').innerText).contains(testEvent);
});

test('Administrator can edit existing event', async t => {
    const testEventNew = 'Business Knigge X';

    await t.click(buttonAdministration)
            .click(eventMngmt)
            .typeText('#search_events', 'Business Knigge 5', { replace: true})
            .click('#table_events tbody td button[id="edit_column"]')
            .typeText('#designation_event', testEventNew, { replace: true})
            .click('#add_event_save')
            .typeText('#search_events', testEventNew, { replace: true})
            .expect(Selector('#table_events tbody td:nth-child(2)').innerText).contains(testEventNew);
});

test('Administrator can register new exam', async t => {
    const testExam = 'Business Knigge 0: Klausur'

    await t.click(buttonAdministration)
            .click(examMngmt)
            .click('#add_exam')
            .typeText('#designation_exam', testExam)
            .typeText('#starting_point', '10:00')
            .typeText('#end_point', '11:30')
            .typeText('#date', '26.04.2024')
            .typeText('#location_exam', 'Mettmann')
            .click('#add_exam_save')
            .typeText('#search_exams', testExam, {replace: true})
            .expect(Selector('#table_exams tbody td:nth-child(2)').innerText).contains(testExam);
});

test('Administrator can register new students', async t => {
    const testStudent2 = 'leo123@test.com';

    await t.click(buttonAdministration)
            .click(studentMngmt)
            .click('#add_user')
            .typeText('#mail_user', testStudent)
            .typeText('#forename_user', 'Jeff')
            .typeText('#surname_user', 'TestNew')
            .typeText('#role_user', 'student')
            .typeText('#entry_user', '01.01.2023')
            .typeText('#exit_user', '01.01.2024')
            .typeText('#exmatriculated_user', 'Yes')
            .click('#add_user_save')
            .typeText('#search_users', testStudent, {replace: true})
            .expect(Selector('#table_users tbody td:nth-child(2)').innerText).contains(testStudent)

            .click('#add_user')
            .typeText('#mail_user', testStudent2)
            .typeText('#forename_user', 'Leo')
            .typeText('#surname_user', 'TestNew2')
            .typeText('#role_user', 'student')
            .typeText('#entry_user', '01.01.2024')
            .typeText('#exit_user', '')
            .typeText('#exmatriculated_user', 'No')
            .click('#add_user_save')
            .typeText('#search_users', testStudent2, {replace: true})
            .expect(Selector('#table_users tbody td:nth-child(2)').innerText).contains(testStudent2);
});

test('Administrator can delete a student', async t => {
    await t
            .typeText('#search_users', testStudent)
            .click('#table_users tbody td button[id="delete_column"]')
            .click('#delete_user_dialog')
            .typeText('#search_users', testStudent, { replace: true})
            .expect(Selector('#table_users tbody td:nth-child(2)').exists).notOk();
});