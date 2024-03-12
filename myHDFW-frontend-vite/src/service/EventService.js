export const EventService = {
    getRoomsData() {
        return [
            {
                id: '1000',
                designation: 'Business Knigge 0',
                capacity: '30',
                starting_point: '10:00',
                end_point: '12:30',
                date: '17.02.2024',
                location: 'Mettmann'
                //room
            },
            {
                id: '1001',
                designation: 'Business Knigge 1',
                capacity: '30',
                starting_point: '10:00',
                end_point: '12:30',
                date: '17.02.2024',
                location: 'Mettmann'
            },
            {
                id: '1002',
                designation: 'Business Knigge 2',
                capacity: '30',
                starting_point: '10:00',
                end_point: '12:30',
                date: '17.02.2024',
                location: 'Mettmann'
            },
            {
                id: '1003',
                designation: 'Business Knigge 3',
                capacity: '30',
                starting_point: '10:00',
                end_point: '12:30',
                date: '17.02.2024',
                location: 'Mettmann'
            },
            {
                id: '1004',
                designation: 'Business Knigge 4',
                capacity: '30',
                starting_point: '10:00',
                end_point: '12:30',
                date: '17.02.2024',
                location: 'Mettmann'
            },
            {
                id: '1005',
                designation: 'Business Knigge 5',
                capacity: '30',
                starting_point: '10:00',
                end_point: '12:30',
                date: '17.02.2024',
                location: 'Mettmann'
            },
        ];
    },

    getEvents() {
        return Promise.resolve(this.getRoomsData());
    }
};

