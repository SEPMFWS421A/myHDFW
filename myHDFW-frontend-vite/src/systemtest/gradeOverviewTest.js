const { Selector } = require("testcafe");

fixture('Grade Overview - Functions')
        .page('http://localhost:5173/Notenverwaltung/');

test('The correct card can be found on the page', async t => {
    const Notenübersicht = Selector('.Notenübersicht');
    await t.expect(Notenübersicht.exists).ok();
});

test('Check if clicking button opens next table', async t => {
    const button = Selector('button[aria-label="Next Page"]');
    const entryTwo = Selector('td').withText('2');

    await t.click(button);
    await t.expect(entryTwo().exists).ok();
});





























