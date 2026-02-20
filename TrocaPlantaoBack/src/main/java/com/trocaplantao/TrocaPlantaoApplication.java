package com.trocaplantao;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TrocaPlantaoApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrocaPlantaoApplication.class, args);
    }

}
