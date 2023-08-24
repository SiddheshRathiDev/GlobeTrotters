using System;
using System.Collections.Generic;
using WebApplicationMySql.DTO;

namespace Dacproject.Models;

public partial class Community
{
    private Community() { }
    public Community(CommunityDTO communityDTO)
    {
        this.AdminUserId = communityDTO.AdminUserId;
    }
    
    public int CommunityId { get; set; }

    public int? AdminUserId { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual User? AdminUser { get; set; }

    public virtual ICollection<JoinedCommunity> JoinedCommunities { get; set; } = new List<JoinedCommunity>();
}
