import {ClientFunction, Selector} from 'testcafe';

fixture('Sidebar Test')
        .page('http://localhost:5173/');

test('Sidebar is present on the page', async t => {
    const sidebar = Selector('.sidebar');
    await t.expect(sidebar.exists).ok();
});
test('Sidebar contains all elements', async t => {
    const sidebar = Selector('.sidebar');
    const logo = sidebar.find('.logo');
    const link1 = sidebar.find('.p-menuitem-link').withText('Startseite');
    const link2 = sidebar.find('.p-menuitem-link').withText('Administration');
    const link3 = sidebar.find('.p-menuitem-link').withText('Kalendar');

    await t
            .expect(logo.exists).ok()
            .expect(link1.exists).ok()
            .expect(link2.exists).ok()
            .expect(link3.exists).ok();
});

test('Sidebar navigates correctly', async t => {
    const sidebar = Selector('.sidebar');
    const logo = sidebar.find('.logo');
    const link1 = sidebar.find('.p-menuitem-link').withText('Startseite');
    const link2 = sidebar.find('.p-menuitem-link').withText('Administration');
    const link3 = sidebar.find('.p-menuitem-link').withText('Kalendar');

    const getLocation = ClientFunction(() => document.location.href);

    await t
            .click(link1)
            .expect(getLocation()).contains('/')
            .click(link2)
            .expect(getLocation()).contains('/admin')
            .click(link3)
            .expect(getLocation()).contains('/schedule')
            .click(logo())
            .expect(getLocation()).contains('/');
});