export const UserService = {
    getUsersData() {
        return [
            {
                id: '5000',
                mail: 'jeff123@test.com',
                forename: 'Jeff',
                surname: 'Test',
                role: 'student',
                entry: '01.01.2021',
                exit: 'X',
                exmatriculated: 'No'
            },
            {
                id: '5001',
                mail: 'leo123@test.com',
                forename: 'Leo',
                surname: 'Test',
                role: 'student',
                entry: '01.01.2021',
                exit: '02.01.2021',
                exmatriculated: 'Yes'
            },
            {
                id: '5002',
                mail: 'lisa123@test.com',
                forename: 'Lisa',
                surname: 'Test',
                role: 'professor',
                entry: '01.01.2000',
                exit: 'X',
                exmatriculated: 'No'
            },
            {
                id: '5003',
                mail: 'niklas123@test.com',
                forename: 'Niklas',
                surname: 'Test',
                role: 'administration',
                entry: '01.01.2021',
                exit: 'X',
                exmatriculated: 'No'
            },
            {
                id: '5004',
                mail: 'elizabeth123@test.com',
                forename: 'Elizabeth',
                surname: 'Test',
                role: 'student',
                entry: '01.01.2021',
                exit: 'X',
                exmatriculated: 'No'
            },
            {
                id: '5005',
                mail: 'kaileb123@test.com',
                forename: 'Kaileb',
                surname: 'Test',
                role: 'professor',
                entry: '01.01.2021',
                exit: 'X',
                exmatriculated: 'No'
            },
        ];
    },

    getUsers() {
        return Promise.resolve(this.getUsersData());
    }
};