package com.ehr_project.ehr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;


@SpringBootApplication
@EnableEncryptableProperties
public class EhrApplication {

	public static void main(String[] args) {
		SpringApplication.run(EhrApplication.class, args);
	}


}