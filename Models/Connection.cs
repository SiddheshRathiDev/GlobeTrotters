using System;
using System.Collections.Generic;

namespace Dacproject.Models;

public partial class Connection
{
    public int ConnectionId { get; set; }

    public int FollowingTo { get; set; }

    public int FollowedBy { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual User FollowedByNavigation { get; set; } = null!;

    public virtual User FollowingToNavigation { get; set; } = null!;
}
