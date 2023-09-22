using System;
using System.Collections.Generic;

namespace Dacproject.Models;

public partial class Conversation
{
    public int ConversationId { get; set; }

    public int? UserOne { get; set; }

    public int? UserTwo { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual User? UserOneNavigation { get; set; }

    public virtual User? UserTwoNavigation { get; set; }
}
