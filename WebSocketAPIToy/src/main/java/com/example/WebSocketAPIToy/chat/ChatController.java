package com.example.WebSocketAPIToy.chat;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {

    @GetMapping("/myHandler")
    public String getChat() {
        return "chat";
    }

}
