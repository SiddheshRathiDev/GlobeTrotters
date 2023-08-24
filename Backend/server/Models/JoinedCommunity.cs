using System;
using System.Collections.Generic;
using WebApplicationMySql.DTO;

namespace Dacproject.Models;

public partial class JoinedCommunity
{
    private JoinedCommunity() { }
    public JoinedCommunity(JoinedCommunityDTO joinedCommunityDTO)
    {
        this.UserId = joinedCommunityDTO.UserId;
        this.CommunityId = joinedCommunityDTO.CommunityId;
    }
    public int JoinedCommunityId { get; set; }

    public int? UserId { get; set; }

    public int? CommunityId { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual Community? Community { get; set; }

    public virtual User? User { get; set; }
}
