import {ClientFunction, RequestMock, Selector} from 'testcafe';

fixture('Header Test')
        .page('http://localhost:5173/')

test('Header is present on the page', async t => {
    const header = Selector('.header-container');
    await t.expect(header.exists).ok();
});

test('Header contains all elements', async t => {
    const header_right = Selector('.header-right-menu');
    const notifications = header_right.find('.notifications');
    const profile = header_right.find('.profile');

    await t.expect(header_right.exists).ok()
            .expect(notifications.exists).ok()
            .expect(profile.exists).ok();
});

test('Profile menu is hidden', async t => {
    const profileMenu = Selector('.profile-menu');
    await t.expect(profileMenu.exists).notOk();
});

test('Login panel is visible instead of profile menu when not logged in on click', async t => {
    const profile = Selector('.header-right-menu').find('.profile');
    const profileMenu = Selector('profile-menu');
    const loginMenu = Selector('.p-component');

    const buttonCancel = loginMenu.find('.p-button-secondary').withText('Cancel');
    const buttonSave = loginMenu.find('.p-button').withText('Save');

    await t.expect(profileMenu.exists).notOk()
            .click(profile)
            .expect(loginMenu.exists).ok()
            .expect(buttonCancel.exists).ok()
            .expect(buttonSave.exists).ok()
            .typeText("#username", "admin")
            .typeText("#password", "password")
            .click(buttonSave);
});

test('Open and Close Login', async t => {
    const profile = Selector('.header-right-menu').find('.profile');
    const loginMenu = Selector('.login-dialog')
    const cancel = loginMenu.find('.p-button-secondary');

    await t.click(profile)
            .expect(loginMenu.exists).ok()
            .click(cancel)
            .expect(loginMenu.exists).notOk();
});

test('Password field hides input characters', async t => {
    const profile = Selector('.header-right-menu').find('.profile');
    const loginMenu = Selector('.login-dialog');
    const username = loginMenu.find('#username');
    const password = loginMenu.find('#password');

    await t.click(profile)
            .typeText(username, 'admin')
            .typeText(password, 'wrongpassword')
            .expect(password.getAttribute('type')).eql('password');
});
test('Login with wrong credentials', async t => {
    const profile = Selector('.header-right-menu').find('.profile');
    const loginMenu = Selector('.login-dialog');
    const username = loginMenu.find('#username');
    const password = loginMenu.find('#password');
    const loginButton = loginMenu.find('.login-button');
    const errorBox = loginMenu.find('.error-box');

    await t.click(profile)
            .typeText(username, 'admin')
            .typeText(password, 'wrongpassword')
            .click(loginButton)
            .expect(errorBox.exists).ok();
});

const mock = RequestMock()
        .onRequestTo('http://localhost:8080/api/v1/auth/login')
        .respond("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxODAwMDAwMDAwLCJzdXJuYW1lIjoiTXVzdGVybWFubiIsInJvbGVzIjpbIlNUVURFTlQiXSwibmFtZSI6Ik1heCJ9.MU3TCHXxPJHfpPSvNNZXP86R6PE0m6WkDj9dd5TDN5E"
                , 200, {'access-control-allow-origin': '*'});
fixture('Header Test with Mock')
        .page('http://localhost:5173/')
        .requestHooks(mock);


test('Show name after Login with correct credentials', async t => {
    const profile = Selector('.header-right-menu').find('.profile');
    const loginMenu = Selector('.login-dialog');
    const username = loginMenu.find('#username');
    const password = loginMenu.find('#password');
    const loginButton = loginMenu.find('.login-button');
    const headername = Selector('.header-name');
    await t.click(profile)
            .typeText(username, 'admin')
            .typeText(password, 'admin')
            .click(loginButton)
            .wait(1000)
            .expect(loginMenu.exists).notOk()
            .expect(headername.textContent).eql('Max Mustermann');

});

test('Profile menu is visible after login & click', async t => {
    const profile = Selector('.header-right-menu').find('.profile');
    const loginMenu = Selector('.login-dialog');
    const username = loginMenu.find('#username');
    const password = loginMenu.find('#password');
    const loginButton = loginMenu.find('.login-button');

    await t.click(profile)
            .typeText(username, 'admin')
            .typeText(password, 'admin')
            .click(loginButton)
            .wait(1000);

    const profileMenu = Selector('.profile-menu');

    const profileEntry = profileMenu.find('.p-menuitem-text').withText('Profil');
    const logoutEntry = profileMenu.find('.p-menuitem-text').withText('Abmelden');

    await t.expect(profileMenu.exists).notOk()
            .click(profile)
            .expect(profileMenu.exists).ok()
            .expect(profileEntry.exists).ok()
            .expect(logoutEntry.exists).ok();
});


test('Profile menu navigates correctly', async t => {
    const profile = Selector('.header-right-menu').find('.profile');
    const loginMenu = Selector('.login-dialog');
    const username = loginMenu.find('#username');
    const password = loginMenu.find('#password');
    const loginButton = loginMenu.find('.login-button');

    await t.click(profile)
            .typeText(username, 'admin')
            .typeText(password, 'admin')
            .click(loginButton)
            .wait(1000);

    const profileMenu = Selector('.profile-menu');

    const profileEntry = profileMenu.find('.p-menuitem').withText('Profil');
    const logoutEntry = profileMenu.find('.p-menuitem-text').withText('Abmelden');
    const getLocation = ClientFunction(() => document.location.href);

    await t.expect(profileMenu.exists).notOk()
            .click(profile)
            .expect(profileMenu.exists).ok()
            .expect(profileEntry.exists).ok()
            .click(profileEntry)
            .expect(getLocation()).contains('/profile')
            .click(profile)
            .click(logoutEntry)
            .expect(getLocation()).contains('/logout');
});





