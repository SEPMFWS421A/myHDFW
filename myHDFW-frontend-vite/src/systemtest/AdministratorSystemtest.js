import {ClientFunction, Selector} from 'testcafe';

fixture('Administrator Features')
        .page('http://localhost:5173/');

test('Administrator page requires login as administrator', async t => {
    const buttonAdministration = Selector('.sidebar-menu')
            .find('.p-menuitem')
            .withText('Administration');
    const loginMenu = Selector('.p-dialog').find('.p-component');

    await t.click(buttonAdministration)
            .expect(loginMenu.exists).ok()
            .typeText('#username', 'admin')
            .typeText('#password', 'password')
            .click(loginMenu.find('.p-button'));
});


test('Logged in administrator can access admin panel', async t => {
    const buttonAdministration = Selector('.sidebar-menu')
            .find('.p-menuitem')
            .withText('Administration');

    const mainView = Selector('.mainView');
    const roomMngmt = mainView.find('.Raumverwaltung');
    const eventMngmt = mainView.find('.Eventverwaltung');
    const examMngmt = mainView.find('.Prüfungsverwaltung');
    const studentMngmt = mainView.find('.Studentenverwaltung');


    await t.click(buttonAdministration)
            .expect(roomMngmt.exists).ok()
            .expect(eventMngmt.exists).ok()
            .expect(examMngmt.exists).ok()
            .expect(studentMngmt.exists).ok();
});

test('Administrator can register new rooms', async t => {

});

test('Administrator can register new lecture', async t => {

});

test('Administrator can register new exam', async t => {

});

test('Administrator can register new students', async t => {

});

test('Administrator can delete a student', async t => {

});