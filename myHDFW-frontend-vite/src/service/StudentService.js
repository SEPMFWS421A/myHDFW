export const StudentService = {
    getStudentsData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Bamboo Student',
                description: 'Product Description',
                image: 'bamboo-watch.jpg',
                price: 595,
                category: 'Wirtschaftsinformatik',
                quantity: 24,
                inventoryStatus: 'Studiert',
                rating: 5
            },

        ];
    },

    getStudents() {
        return Promise.resolve(this.getStudentsData());
    }
};