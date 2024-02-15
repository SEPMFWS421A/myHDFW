export const RoomService = {
    getRoomsData() {
        return [
            {
                id: '5000',
                designation: 'T-5000',
                capacity: '30',
                exam_capacity: '10',
                equipment: 'Beamer, Elektrizität',
                location: 'Mettmann'
            },
            {
                id: '5001',
                designation: 'T-5001',
                capacity: '30',
                exam_capacity: '10',
                equipment: 'Beamer, Elektrizität',
                location: 'Mettmann'
            },
            {
                id: '5002',
                designation: 'T-5002',
                capacity: '30',
                exam_capacity: '10',
                equipment: 'Beamer, Elektrizität',
                location: 'Mettmann'
            },
            {
                id: '5003',
                designation: 'T-5003',
                capacity: '30',
                exam_capacity: '10',
                equipment: 'Beamer, Elektrizität',
                location: 'Mettmann'
            },
            {
                id: '5004',
                designation: 'T-5004',
                capacity: '30',
                exam_capacity: '10',
                equipment: 'Beamer, Elektrizität',
                location: 'Mettmann'
            },
            {
                id: '5005',
                designation: 'T-5005',
                capacity: '30',
                exam_capacity: '10',
                equipment: 'Beamer, Elektrizität',
                location: 'Mettmann'
            },
        ];
    },

    getRooms() {
        return Promise.resolve(this.getRoomsData());
    }
};