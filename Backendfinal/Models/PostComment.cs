using System;
using System.Collections.Generic;

namespace Dacproject.Models;

public partial class PostComment
{
    public int CommentId { get; set; }

    public int? PostId { get; set; }

    public int? UserId { get; set; }

    public DateTime? CreatedDatetime { get; set; }

    public string? CommentContent { get; set; }

    public string? Extra1 { get; set; }

    public string? Extra2 { get; set; }

    public virtual Post? Post { get; set; }

    public virtual User? User { get; set; }
}
