using System;
using System.Collections.Generic;
using WebApplicationMySql.DTO;

namespace Dacproject.Models;

public partial class PostComment
{
    private PostComment() { }
    public PostComment(PostCommentDTO postCommentDTO)
    {
        this.PostId = postCommentDTO.PostId;
        this.UserId = postCommentDTO.UserId;
        this.CreatedDatetime = postCommentDTO.CreatedDatetime;
    }
    public int CommentId { get; set; }

    public int? PostId { get; set; }

    public int? UserId { get; set; }

    public DateTime? CreatedDatetime { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual Post? Post { get; set; }

    public virtual User? User { get; set; }
}
