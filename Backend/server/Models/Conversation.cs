using System;
using System.Collections.Generic;
using WebApplicationMySql.DTO;

namespace Dacproject.Models;

public partial class Conversation
{
    private Conversation() { }
    public Conversation(ConversationDTO conversationDTO) 
    {
        this.UserOne = conversationDTO.UserOne;
        this.UserTwo = conversationDTO.UserTwo;     
    }
    public int ConversationId { get; set; }

    public int? UserOne { get; set; }

    public int? UserTwo { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual User? UserOneNavigation { get; set; }

    public virtual User? UserTwoNavigation { get; set; }
}
