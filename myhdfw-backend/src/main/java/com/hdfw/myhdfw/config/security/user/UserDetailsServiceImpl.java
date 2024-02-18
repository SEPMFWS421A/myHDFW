package com.hdfw.myhdfw.config.security.user;

import com.hdfw.myhdfw.model.Employee;
import com.hdfw.myhdfw.model.Student;
import com.hdfw.myhdfw.repository.EmployeeRepository;
import com.hdfw.myhdfw.repository.StudentRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    private final StudentRepository studentRepository;
    private final EmployeeRepository employeeRepository;

    public UserDetailsServiceImpl(StudentRepository studentRepository, EmployeeRepository employeeRepository) {
        this.studentRepository = studentRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Student student = studentRepository.findByEmail(username);
        if (student != null) {
            return new UserDetailsImpl(student.getEmail(), student.getSurname(), student.getName(), student.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_STUDENT")));
        }
        Employee employee = employeeRepository.findByEmail(username);
        if (employee != null) {
            return new UserDetailsImpl(employee.getEmail(), employee.getSurname(), employee.getName(), employee.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_STUDENT")));
        }
        throw new UsernameNotFoundException("User not found");
    }
}
