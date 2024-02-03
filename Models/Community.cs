using System;
using System.Collections.Generic;

namespace Dacproject.Models;

public partial class Community
{
    public int CommunityId { get; set; }

    public int? AdminUserId { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual User? AdminUser { get; set; }

    public virtual ICollection<JoinedCommunity> JoinedCommunities { get; set; } = new List<JoinedCommunity>();
}
