  export const ExamServiceHelp = {
    getExamStructure() {
        return [
            {
                id: '',
                study_group: '',
                lecture: '',
                lecturer: '',
                semester: '',
                start_date: '',
                end_date: '',
                form_of_examination: '',
                deadline_lecturer: ''
            },
        ];
    },

    getExam() {
        return Promise.resolve(this.getExamStructure());
    }
};