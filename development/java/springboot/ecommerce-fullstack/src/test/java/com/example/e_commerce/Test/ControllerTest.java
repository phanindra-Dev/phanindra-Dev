package com.example.e_commerce.Test;

import com.example.e_commerce.Entries.User;
import com.example.e_commerce.repo.UserRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ControllerTest {
    @Autowired
    private UserRepository userRepository;

    @Disabled
    @Test
    public void testAdd() {
//        assertEquals(4,2+2);
        assertNotNull(userRepository.findByName("phani"));
    }

    @Disabled
    @ParameterizedTest
    @CsvSource({
            "1,1,2",
            "2,5,7",
            "3,3,6"
    })
    public void test1(int a, int b, int c) {
        assertEquals(c, a + b);
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "phani",
            "sai",
            "krishna",
            "love",
            "jgfcvbjuyg"
    })
    public void testName(String name) {
        Optional<User> user = userRepository.findByName(name);
        assertTrue(user.isPresent(), "User should not be empty for name: " + name);
    }

}
