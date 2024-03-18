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

    await t
            .expect(logo.exists).ok()
            .expect(link1.exists).ok();
});

test('Sidebar navigates correctly', async t => {
    const sidebar = Selector('.sidebar');
    const logo = sidebar.find('.logo');
    const link1 = sidebar.find('.p-menuitem-link').withText('Startseite');

    const getLocation = ClientFunction(() => document.location.href);

    await t
            .click(link1)
            .expect(getLocation()).contains('/')
            .click(logo())
            .expect(getLocation()).contains('/');
});


fixture('Sidebar Test - Student ')
        .page('http://localhost:5173/')
        .clientScripts({
            content: 'window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxODAwMDAwMDAwLCJzdXJuYW1lIjoiTXVzdGVybWFubiIsInJvbGVzIjpbIlNUVURFTlQiXSwibmFtZSI6Ik1heCJ9.MU3TCHXxPJQfpPSvNNZXP86R6PE0m6WkDj9dd5TDN53");'
        });
test('Sidebar is present on the page for student', async t => {
    const sidebar = Selector('.sidebar');
    await t.expect(sidebar.exists).ok();
});
test('Sidebar contains all elements for student', async t => {
    const sidebar = Selector('.sidebar');
    const logo = sidebar.find('.logo');
    const link1 = sidebar.find('.p-menuitem-link').withText('Startseite');
    const link2 = sidebar.find('.p-menuitem-link').withText('Kalender');

    await t
            .expect(logo.exists).ok()
            .expect(link1.exists).ok()
            .expect(link2.exists).ok();
});

test('Sidebar navigates correctly for student', async t => {
    const sidebar = Selector('.sidebar');
    const logo = sidebar.find('.logo');
    const link1 = sidebar.find('.p-menuitem-link').withText('Startseite');
    const link2 = sidebar.find('.p-menuitem-link').withText('Kalender');

    const getLocation = ClientFunction(() => document.location.href);

    await t
            .click(link2)
            .expect(getLocation()).contains('/schedule')
            .click(link1)
            .expect(getLocation()).contains('/')
            .click(link2)
            .expect(getLocation()).contains('/schedule')
            .click(logo())
            .expect(getLocation()).contains('/');
});


fixture('Sidebar Test - Admin')
        .page('http://localhost:5173/')
        .clientScripts({
            content: 'window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxODAwMDAwMDAwLCJzdXJuYW1lIjoiTXVzdGVybWFubiIsInJvbGVzIjpbIkVNUExPWUVFIl0sIm5hbWUiOiJNYXgifQ.aPaHcT3dcYxVNlUHWN61zEHtHP7G6Hq2JpuRErqhyVw");'
        });

test('Sidebar is present on the page for admin', async t => {
    const sidebar = Selector('.sidebar');
    await t.expect(sidebar.exists).ok();
});
test('Sidebar contains all elements for admin', async t => {
    const sidebar = Selector('.sidebar');
    const logo = sidebar.find('.logo');
    const link1 = sidebar.find('.p-menuitem-link').withText('Startseite');
    const link2 = sidebar.find('.p-menuitem-link').withText('Admin');
    const link3 = sidebar.find('.p-menuitem-link').withText('Kalender');

    await t
            .expect(logo.exists).ok()
            .expect(link1.exists).ok()
            .expect(link2.exists).ok()
            .expect(link3.exists).ok();
});

test('Sidebar navigates correctly for admin', async t => {
    const sidebar = Selector('.sidebar');
    const logo = sidebar.find('.logo');
    const link1 = sidebar.find('.p-menuitem-link').withText('Startseite');
    const link2 = sidebar.find('.p-menuitem-link').withText('Admin');
    const link3 = sidebar.find('.p-menuitem-link').withText('Kalender');

    const getLocation = ClientFunction(() => document.location.href);

    await t
            .click(link2)
            .expect(getLocation()).contains('/admin')
            .click(link1)
            .expect(getLocation()).contains('/')
            .click(link3)
            .expect(getLocation()).contains('/schedule')
            .click(logo())
            .expect(getLocation()).contains('/');
});