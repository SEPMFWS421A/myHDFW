package com.hdfw.myhdfw;

import com.hdfw.myhdfw.model.Student;
import com.hdfw.myhdfw.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
public class Demo {

    @Autowired
    private StudentRepository studentRepository;

    @EventListener(ApplicationStartedEvent.class)
    public void demo() {
        this.studentRepository.save(new Student(1L, "Max", "Mustermann", "email@email.de", "password", null));
    }
}
