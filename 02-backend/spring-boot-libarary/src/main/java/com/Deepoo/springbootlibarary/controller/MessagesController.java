package com.Deepoo.springbootlibarary.controller;

import com.Deepoo.springbootlibarary.entity.Message;
import com.Deepoo.springbootlibarary.requestmodels.AdminQuestionRequest;
import com.Deepoo.springbootlibarary.service.MessageService;
import com.Deepoo.springbootlibarary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessagesController {

    private MessageService messageService;

    @Autowired
    public MessagesController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Message messageRequest){
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        messageService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception{

        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if(admin == null || !admin.equals("admin")){
            throw new Exception("administration page only.");
        }
        messageService.putMessage(adminQuestionRequest, userEmail);
    }
}
