using System;
using System.Collections.Generic;
using WebApplicationMySql.DTO;

namespace Dacproject.Models;

public partial class PostLike
{
    private PostLike() { }

    public PostLike(PostLikeDTO postLikeDTO)
    {
        this.LikeId = 0;

        this.PostId = postLikeDTO.PostId;
        this.UserId = postLikeDTO.UserId;
    }
    public int LikeId { get; set; }

    public int? PostId { get; set; }

    public int? UserId { get; set; }

    public DateTime? CreatedDatetime { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual Post? Post { get; set; }

    public virtual User? User { get; set; }
}
