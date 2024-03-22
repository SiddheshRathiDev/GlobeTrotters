using System;
using System.Collections.Generic;

namespace Dacproject.Models;

public partial class Message
{
    public int MessageId { get; set; }

    public int? UserSender { get; set; }

    public int? UserReceiver { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual User? UserReceiverNavigation { get; set; }

    public virtual User? UserSenderNavigation { get; set; }
}
