const { Selector, ClientFunction} = require("testcafe");

fixture('Administration - link to the next pages')
        .page('http://localhost:5173/admin/');

test('The correct card can be found on the page', async t => {
    const Eventverwaltung = Selector('.Eventverwaltung');
    await t.expect(Eventverwaltung.exists).ok();
});


test('The card navigates to the right page', async t => {
    const sidebar = Selector('.Eventverwaltung');
    const link = sidebar.find('.nav_card_image');

    const getLocation = ClientFunction(() => document.location.href);

    await t
            .click(link)
            .expect(getLocation()).contains('/Eventverwaltung/')
});

