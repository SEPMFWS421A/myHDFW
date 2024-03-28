import { ref } from "vue";
import {LectureControllerApi} from "@/api/service/index.ts";
  

  const lectureService = new LectureControllerApi();

  export const examStructure = ref({
    id: String,
    name: String,
    studentGroupId: Number,
    lecturerId: Number,
    semester: Number,
    lectureWeekday: Date,
    lectureDurationMin: Number,
    lectureRoomId: Number,
    examDate: Date,
    examDurationMin: Number,
    examRoomId: Number,
    examType: Object,
    lecturer: String
  });
  
  export const ExamServiceHelp = {
    getExams(){
        return lectureService.getAllLectures();
    },
};
/*
    //lectureService.getAllLectures.then((data) => (Exams.value = data));
*/ 


/* 
import api from './api';
const additionalPath = '/doctor';

export default {
    getDoctor(doctorId){
        return api().get(additionalPath + '/' + doctorId);
    },
    getDoctors(){
        return api().get(additionalPath);
    },
    hireDoctor(doctor){
        return api().post(additionalPath, doctor, {headers: {'Content-Type': 'application/json'} }); 
    },
    updateDoctor(updatedDoctor){
        return api().put(additionalPath, updatedDoctor, {headers: {'Content-Type': 'application/json'} });
    },
    fireDoctor(doctorId){
        return api().delete(additionalPath + '/' + doctorId);
    }
};
*/