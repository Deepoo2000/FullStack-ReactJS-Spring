package com.Deepoo.springbootlibarary.service;

import com.Deepoo.springbootlibarary.dao.MessageRepository;
import com.Deepoo.springbootlibarary.entity.Message;
import com.Deepoo.springbootlibarary.requestmodels.AdminQuestionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MessageService {

    private MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }


    public void postMessage(Message messageRequest, String userEmail){
        Message message = new Message(messageRequest.getTitle(), messageRequest.getQuestion());
        message.setUserEmail(userEmail);
        messageRepository.save(message);
    }

    public void putMessage(AdminQuestionRequest adminQuestionRequest, String userName)throws Exception{
        Optional<Message> message = messageRepository.findById(adminQuestionRequest.getId());

        if(!message.isPresent()){
            throw new Exception("Message Not Found");
        }

        message.get().setAdminEmail(userName);
        message.get().setResponse(adminQuestionRequest.getResponse());
        message.get().setClosed(true);

        messageRepository.save(message.get());
    }
}
